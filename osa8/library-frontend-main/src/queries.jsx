import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!){
    allBooks (
      genre: $genre
    ) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int, $author: String, $genres: [String!]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      born
    }
  }
`