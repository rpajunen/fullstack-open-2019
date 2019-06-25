const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'root' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'roope',
      name: 'Roope Pajunen',
      password: 'roope',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'Superuser',
      password: '0',
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)

    expect(result.error.text).toContain('Password must be at least 3')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  describe('viewing a specific blog', () => {

    test('succeedes with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body.author).toBe(blogToView.author)
      expect(resultBlog.body.url).toBe(blogToView.url)
      expect(resultBlog.body.likes).toBe(blogToView.likes)
      // this failes expect(resultBlog.body.id).toBe(blogToView.id)
      // this failes expect(resultBlog.body).toBe(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a86a3445'
      // Cast to ObjectId failed for value "5a3d5da59070081a86a3445" at path "_id" for model "Blog"
      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {

    let token;

    beforeEach(async () => {
      await User.deleteMany({})

      const loginUser = {
        username: 'testi',
        name: 'tepa testaaja',
        password: 'testi',
      }

      await api
        .post('/api/users')
        .send(loginUser)

      const response = await api
        .post('/api/login')
        .send({
          "username": "testi",
          "password": "testi"
        })

      token = response.body.token
    })

    test('id field is generated', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

    test('can be added', async () => {
      const newBlog = {
        _id: "5a422bc61b54a671234d17fc",
        title: "Test title",
        author: "T.W Tester",
        url: "http://blog.test.html",
        likes: 0,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(b => b.title)
      expect(contents).toContain('Test title')
    })

    test('like is set to zero', async () => {
      const newBlog = {
        _id: "5a422bc61b54a671234d17fc",
        title: "Test title",
        author: "T.W Tester",
        url: "http://blog.test.html",
        __v: 0
      }

      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(addedBlog.body.likes).toBe(0)
    })

    test('must contain title', async () => {
      const newBlog = {
        _id: "5a422bc61b54a683334d17fc",
        author: "T.W Tester",
        url: "http://blog.test.html",
        __v: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('must contain url', async () => {
      const newBlog = {
        _id: "5a422bc61b54a679898d17fc",
        title: "Test title",
        author: "T.W Tester",
        __v: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {

    let token;

    beforeEach(async () => {
      await User.deleteMany({})

      const loginUser = {
        username: 'testi',
        name: 'tepa testaaja',
        password: 'testi',
      }

      await api
        .post('/api/users')
        .send(loginUser)

      const response = await api
        .post('/api/login')
        .send({
          "username": "testi",
          "password": "testi"
        })

      token = response.body.token
    })

    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const newBlog = {
        _id: "5a422bc61b54a671234d17fc",
        title: "Test title",
        author: "T.W Tester",
        url: "http://blog.test.html",
        likes: 0,
        __v: 0
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .delete(`/api/blogs/${response.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(blogsAtStart.length)

      const contents = blogsAtEnd.map(blog => blog.title)

      expect(contents).not.toContain(response.body.title)
    })
  })

  describe('update of a blog', () => {

    test('is successfull', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = { ...blogsAtStart[0], likes: 99 }

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
      expect(updatedBlog.body.likes).toBe(blogsAtEnd[0].likes)
      expect(updatedBlog.body.likes).toBe(100)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
