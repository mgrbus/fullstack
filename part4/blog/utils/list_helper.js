const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })
    return mostLikes
}

const mostBlogs = (blogs) => {
    let authors = []
    for (let blog in blogs) {
        let sadrzi = false
        for (let author in authors) {
            if (authors[author].author === blogs[blog].author) {
                authors[author].blogs += 1
                sadrzi = true
            }
        }
        if (!sadrzi) {
            authors.push({ author: blogs[blog].author, blogs: 1 })
        }
    }
    const authorMost = authors.reduce((prev, current) => {
        return prev.blogs > current.blogs ? prev : current
    })
    return authorMost
}

const mostLikes = (blogs) => {
    let authors = []
    for (let blog in blogs) {
        let sadrzi = false
        for (let author in authors) {
            if (authors[author].author === blogs[blog].author) {
                authors[author].likes += blogs[blog].likes
                sadrzi = true
            }
        }
        if (!sadrzi) {
            authors.push({ author: blogs[blog].author, likes: blogs[blog].likes })
        }
    }
    const authorMost = authors.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })
    console.log(authorMost)
    return authorMost
}

mostLikes([{author:'asja',likes:7},{author:'darko',likes:7},{author:'asja',likes:9},{author:'darko',likes:8}])

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

