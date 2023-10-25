const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const logger = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  logger.info(user)
  logger.info(blog)

  if(blog.user._id.toString() === user.id.toString()){
    const result = await Blog.findByIdAndRemove(request.params.id)
    logger.info('Blog deleted: ', result)
    response.status(204).json(result)
  }
})

module.exports = blogsRouter
