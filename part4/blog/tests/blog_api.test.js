const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const Blog = require('../models/blog')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


test('correct number of blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier is named "id"', async () => {
    const response = await api.get('/api/blogs')
    const ids = Object.keys(response.body[0])
    assert(!ids.includes('_id'))
})


test('a valid blog can be added', async () => {
    const users = await helper.usersInDb()
    const userId = users[0].id
    const newBlog = { title: 'mijiij', author: 'lllllll', url: 'mijaijk', likes: 44, userId: userId }



    await api
        .post('/api/blogs')
        .set({'Authorization ':`Bearer ${process.env.TOKEN}`})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('mijiij'))
})

test('blog without "likes" property is added with 0 by default', async () => {
    const users = await helper.usersInDb()
    const userId = users[0].id

    const newBlog = { title: 'no likes', url: 'mijlklk', author: 'darac', userId: userId }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const blogs = await helper.blogsInDb()
    const newBloginBlogs = blogs.find(b => b.title === 'no likes')

    assert.strictEqual(newBloginBlogs.likes, 0)
})


test('creating new blog checks if "title" or "url" is missing, responding with 400', async () => {
    const users = await helper.usersInDb()
    const userId = users[0].id

    const noTitle = { author: 'notitle', url: 'mijijjoookds', userId: userId }
    const noUrl = { title: 'nourl', author: 'ja', userId: userId }

    await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(b => b.title)
    const urls = blogs.map(b => b.url)
    assert(!titles.includes('notitle'))
    assert(!urls.includes('nourl'))
})


test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog can be updated with likes property', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 1234 })
        .expect(200)

    const updatedBlogs = await helper.blogsInDb()
    const updatedBlog = updatedBlogs[0]
    assert.deepStrictEqual(updatedBlog.likes, 1234)
})

describe('when there is initially one user in db', () => {
    test('creation succeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'matija',
            user: 'miaj',
            password: 'mkkkll'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username is already taken or shorter than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'mij',
            password: 'eofk'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('shorter than the minimum allowed length') || result.body.error.includes('expected username to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails when password is shorter than 3 characters', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'roowt',
            name: 'mij',
            password: 'fk'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password minimum length is 3 characters'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

})


after(async () => {
    await mongoose.connection.close()
})