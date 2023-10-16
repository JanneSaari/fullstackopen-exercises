const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  logger.info(blog)

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log('Deleting...')
  const result = await Blog.findByIdAndRemove(request.params.id)
  console.log(result)
  console.log('Deleted!')
  response.status(204).json(result)
})

module.exports = blogsRouter
