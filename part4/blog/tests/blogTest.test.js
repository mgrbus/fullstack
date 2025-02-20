const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

const listWithfewBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71brtr54a676234d17f8',
        title: 'Go To Statemytyent Considered Harmful',
        author: 'Edsgeytr W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 8,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 3,
        __v: 0
    }
]


describe('total likes', () => {

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }]

    const emptyList = []


    test('when list has few blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithfewBlog)
        assert.strictEqual(result, 18)
    })

    test('when list has one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list is empty likes are zero', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })
})

describe('most likes', () => {
    test('returns blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithfewBlog)
        assert.deepStrictEqual(result, {
            _id: '5a422aa71brtr54a676234d17f8',
            title: 'Go To Statemytyent Considered Harmful',
            author: 'Edsgeytr W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 8,
            __v: 0
        })
    })
})

describe('most blogs', () => {
    test('returns author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithfewBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    })
})

describe('author with most likes', () => {
    test('returns author with most likes', () => {
        const result = listHelper.mostLikes(listWithfewBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 10 })
    })
})