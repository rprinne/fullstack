const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Session } = require('../models/index')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization &&
    authorization.toLowerCase().startsWith('bearer ')) {
      try {
        const token = authorization.substring(7)
        console.log(token)
        const session = await Session.findByPk(token)
        const user = jwt.verify(token, SECRET)

        if (session.userId == user.id) {
          req.decodedToken = user
        }
        else {
          return res.status(401).json({ error: 'session not found' })
        }
      } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'token invalid or disabled' })
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