const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch(error => {
    logger.error('error connecting to MongoDB', error.message)
})


app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorhandler)



module.exports = app