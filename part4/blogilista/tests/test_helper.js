const supertest = require('supertest')
require('express-async-errors')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    'title': 'TestTitle',
    'author': 'TestName',
    'url': 'some/test/url',
    'likes': '7'
  },
  {
    'title': 'SomeTitle',
    'author': 'TesterMcTestFace',
    'url': 'url/test/blog',
    'likes': '9'
  },
  {
    'title': 'BlogName',
    'author': 'TestName',
    'url': 'nice/blog/name',
    'likes': '3'
  }
]

const blogsInDB = async() => {
  const response = await api.get('/api/blogs')
  return response.body
}

const validExistingId = async() => {
  const blogs = await blogsInDB()
  return blogs[0].id
}

const validNonExistingId = async() => {
  const id = '1111111111'
  return id
}

module.exports = { blogsInDB, validExistingId, validNonExistingId, initialBlogs }