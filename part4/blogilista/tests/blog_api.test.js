const mongoose = require('mongoose')
const supertest = require('supertest')
require('express-async-errors')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const InitialBlogs = [
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


test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('identifying field is called: id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('new blog can be added', async () => {
  const first = await api.get('/api/blogs')
  const countBefore = first.body.length

  const newBlog = {
    'title': 'TestTitle',
    'author': 'TestName',
    'url': 'some/test/url',
    'likes': '5'
  }

  await api.post('/api/blogs').send(newBlog)

  const second = await api.get('/api/blogs')
  const countAfter = second.body.length

  expect(countAfter === countBefore + 1)
})

test('if likes doesn\'t have a value, it is set to 0', async () => {
  const newBlog = {
    'title': 'BlogWithoutLikes',
    'author': 'NoLikes',
    'url': 'some/test/url'
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('if url is not defined, new blog can\'t be added', async () => {
  const blogWithoutURL = {
    'title': 'BlogWithoutURL',
    'author': 'NoUrl'
  }
  await api.post('/api/blogs').send(blogWithoutURL).expect(400)
})

test('if title is not defined, new blog can\'t be added', async () => {
  const blogWithoutTitle = {
    'author': 'NoTitle',
    'url': 'some/test/url'
  }
  await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(InitialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(InitialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(InitialBlogs[2])
  await blogObject.save()
})