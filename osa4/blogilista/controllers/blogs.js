const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  console.log(body)

  const updatedBlog =
    await Blog.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true })
  res.status(200).json(updatedBlog)
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  if (body.title === undefined || body.author === undefined) {
    return res.status(400).json({error: 'some content missing'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  blog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter