const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const config = require('../utils/config')
const logger = require('../utils/logger')

const url = config.MONGODB_URI
mongoose.connect(url)
  .then(result => {
    logger.info('connected to MongoDB')
    //console.log('result', result)
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema)
