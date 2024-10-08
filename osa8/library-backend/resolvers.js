const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({name: args.author})
        filter = {...filter, author: author._id}
      }
      if (args.genre && !(args.genre === "")) {
        filter = {...filter, genres: args.genre}
      }
      return Book.find(filter).populate('author')
    },
    allGenres: async () => Book.distinct('genres'),
    allAuthors: async () => Author.aggregate([
      {
        $lookup:
          {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
      },
      {
        $addFields:
          {
            bookCount: {
              $size: "$books",
            },
          },
      },
      {
        $project:
          {
            books: 0,
          },
      },
    ]),
    me: (root, args, context) => { return context.currentUser }
  },
  Book: {
    id: (root) => root._id,
    author: async (root) => Author.findById(root.author)
  },
  Author: {
    id: (root) => root._id,
    name: (root) => root.name,
    bookCount: async (root) => Book.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User authorization failed', {
          extensions: {
            code: 'USER_UNAUTHORIZED',
            invalidArgs: args.name,
          }
        })
      }

      let author
      try {
        author = await Author.findOneAndUpdate(
          { name: args.author },
          { name: args.author, born: null },
          { new: true, upsert: true }
        )
      } catch (error) {
        throw new GraphQLError('Creating author failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }

      const newBook = new Book({ ...args, author: author._id })
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User authorization failed', {
          extensions: {
            code: 'USER_UNAUTHORIZED',
            invalidArgs: args.name,
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: args.name,
          }
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers