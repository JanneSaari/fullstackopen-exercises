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

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  //TODO move checking to model after I learn how to actually make it work
  if(blog.likes === null)
  {
    response.status(400).send()
    return
  }
  //TODO should propably return 404 instead of 400 if update failed because of nonexisting id
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(result)
})

module.exports = blogsRouter
