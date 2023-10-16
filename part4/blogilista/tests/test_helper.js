const supertest = require('supertest')
require('express-async-errors')
const app = require('../app')
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

const blogsInDB = async(request, response) => {
  response = await api.get('/api/blogs')
  return response.body
}

module.exports = { blogsInDB, initialBlogs }