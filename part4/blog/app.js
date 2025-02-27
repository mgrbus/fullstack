require('express-async-errors')

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorhandler)

app.use(middleware.unknownEndpoint)



module.exports = app