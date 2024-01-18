const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const logger = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user
  blog.user = user.id

  logger.info('blog in blogsRouter/post', blog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  savedBlog.user = user

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user
  blog.user = user.id
  logger.info('blog in blogsRouter/put', blog)

  //TODO move checking to model after I learn how to actually make it work
  if (blog.likes === null) {
    logger.info('failed to update blog')
    response.status(400).send()
    return
  }
  //TODO should propably return 404 instead of 400 if update failed because of nonexisting id
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user')
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  logger.info('delete, user:', user)
  logger.info('delete, blog:', blog)

  const result = await Blog.findByIdAndRemove(request.params.id)
  logger.info('Blog deleted: ', result)

  //Remove blog from users blog list
  let oldUserData = await User.findById(user.id)
  logger.info('old user blogs', oldUserData.blogs)
  const updatedBlogs = oldUserData.blogs.toSpliced(
    oldUserData.blogs.indexOf(blog._id),
    1,
  )
  logger.info('updated user blogs', updatedBlogs)
  oldUserData.blogs = updatedBlogs
  logger.info('updated user', oldUserData)
  await User.findByIdAndUpdate(user.id, oldUserData)

  response.status(204).json(result)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blogs = await Blog.find({})
  const comments = blogs.comments
  response.json(comments)
})


blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const comment = request.body.comment

  let updatedBlog = await Blog.findById(request.params.id)
  updatedBlog.comments.push(comment)
  await updatedBlog.save()
  response.json(updatedBlog)
})


module.exports = blogsRouter
