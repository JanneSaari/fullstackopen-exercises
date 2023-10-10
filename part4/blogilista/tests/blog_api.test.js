const mongoose = require('mongoose')
const supertest = require('supertest')
require('express-async-errors')
const app = require('../app')

const api = supertest(app)

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
  console.log(countBefore, countAfter)
})

afterAll(async () => {
  await mongoose.connection.close()
})