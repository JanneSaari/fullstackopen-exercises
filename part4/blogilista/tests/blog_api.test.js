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
        'title': 'newBlog',
        'author': 'newAuthor',
        'url': 'new/url',
        'likes': '5'
      }

      const res = await api.post('/api/blogs').send(newBlog)
      const addedBlog = res.body

      const second = await helper.blogsInDB()
      const countAfter = second.length

      console.log(addedBlog)
      expect(countAfter === countBefore + 1)
      expect(second).toContainEqual(addedBlog)
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

  describe('editing a existing blog', () => {
    test('succeed with status code 200 if updated', async () => {
      const blogsInDB = await helper.blogsInDB()
      let editedBlog = blogsInDB[0]
      editedBlog.likes += 1

      const response = await api.put(`/api/blogs/${editedBlog.id}`).send(editedBlog).expect(200)
      const afterEdit = response.body

      expect(afterEdit.likes).toBe(editedBlog.likes)
    })

    test('return status code 400 if id is not found', async () => {
      const blogsInDB = await helper.blogsInDB()
      let editedBlog = blogsInDB[0]
      editedBlog.likes += 1
      const nonExistingId = await helper.validNonExistingId()

      await api.put(`/api/blogs/${nonExistingId}`).send(editedBlog).expect(400)
    })

    test('don\'t update if values were not valid', async () => {
      const blogsInDB = await helper.blogsInDB()
      const beforeEdit = blogsInDB[0]
      let editedBlog = { ...beforeEdit }
      editedBlog.likes = null

      await api.put(`/api/blogs/${editedBlog.id}`).send(editedBlog).expect(400)
      const foo = await helper.blogsInDB()
      const afterEdit = foo[0]

      console.log(beforeEdit)
      console.log(afterEdit)

      expect(afterEdit).toEqual(beforeEdit)
    })
  })

  describe('deleting blogs', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      let blogsInDB = await helper.blogsInDB()
      const blogToDelete = blogsInDB[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      blogsInDB = await helper.blogsInDB()

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