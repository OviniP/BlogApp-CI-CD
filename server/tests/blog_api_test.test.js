const { test,after,beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../../app')
const api = supertest(app)

const userToCreate = {
  userName: 'ovini123blogapi',
  password : 'ovini123',
  name: 'Ovini P'
}
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initializeBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await api.post('/api/users')
    .send(userToCreate)
  const loginResponse = await api.post('/api/login')
    .send(userToCreate)
  token = loginResponse.body.token
})


describe('HTTP GET', () => {
  test('when get is called then 2 blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(helper.initializeBlogs.length,response.body.length)
  })

  test('blog post contains id property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert(Object.prototype.hasOwnProperty.call(blog, 'id'))
  })
})

after(async() => {
  mongoose.connection.close()
})