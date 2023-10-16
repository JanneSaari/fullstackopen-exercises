const mongoose = require('mongoose')
const supertest = require('supertest')
require('express-async-errors')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

describe('with a initial list of blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('identifying field is called: id', async () => {
    const response = await helper.blogsInDB()
    expect(response[0].id).toBeDefined()
  })

  describe('adding new blogs', () => {
    test('new blog can be added', async () => {
      const first = await helper.blogsInDB()
      const countBefore = first.length

      const newBlog = {
        'title': 'TestTitle',
        'author': 'TestName',
        'url': 'some/test/url',
        'likes': '5'
      }

      await api.post('/api/blogs').send(newBlog)

      const second = await helper.blogsInDB()
      const countAfter = second.length

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
  })

  describe('deleting blogs', () => {

    test('deleting a blog', async () => {
      let blogsInDB = await helper.blogsInDB()
      console.log(blogsInDB)
      const blogToDelete = blogsInDB[0]
      console.log(blogToDelete)
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      blogsInDB = await helper.blogsInDB()
      console.log(blogsInDB)

      expect(blogsInDB).toHaveLength(helper.initialBlogs.length - 1)
      const contents = blogsInDB.map(r => r.content)
      expect(contents).not.toContain(blogToDelete)
    })
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})