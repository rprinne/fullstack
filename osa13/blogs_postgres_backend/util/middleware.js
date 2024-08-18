const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization &&
    authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7),
          SECRET)
      } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
  } else {
      return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  next(error)
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}