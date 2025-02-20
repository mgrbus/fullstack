const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'mijiji',
        url: 'nijjkass',
        likes: 3
    },
    {
        title: 'HTML is edfgdgdgfgfgasy',
        author: 'iiiiiiiiiiiiiji',
        url: 'nijjssssssssssssssssskass',
        likes: 390
    },
    {
        title: 'HTML is egdgdasy',
        author: 'mijiji',
        url: 'nijjkass',
        likes: 3
    },
    {
        title: 'HTML is edfdgfgdgdgfgfgasy',
        author: 'iiiiiiiiiiiiiji',
        url: 'nijjssssssssssssssssskass',
        likes: 390
    },

]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'will remove this soon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


module.exports = { initialBlogs, usersInDb, nonExistingId, blogsInDb }