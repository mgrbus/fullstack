const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const { nonExistingId } = require('../tests/test_helper')
const User = require('../models/user')





blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.status(200).json(blog)
})


blogsRouter.post('/', async (req, res) => {
    const body = req.body
    const user = req.user

    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    }
    )
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes })
    const updatedBlog = await Blog.findById(req.params.id)
    res.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    const user = req.user
    if (user.id === blog.user.toString()) {
        await Blog.deleteOne(blog)
        res.status(204).end()
    } else {
        res.status(401).json({ error: 'Delete possible only by blog owner' })
    }
    console.log(blog)
})

module.exports = blogsRouter