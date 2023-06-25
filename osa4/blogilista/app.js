const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('connected to MongoDb')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(express.json())

module.exports = app