const mongoose = require('mongoose')

const Blog = mongoose.Schema({
  title: {type: String, rquired: true},
  author: {type: String, required: true},
  url: {type: String, required: true},
  likes: {type: Number, required: false}
})

Blog.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', Blog)