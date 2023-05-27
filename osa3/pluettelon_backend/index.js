require('dotenv').config()
const express = require('express')
const app = express()

const morgan = require('morgan')

const Person = require('./models/person')

// Morgan /////////////////////////////////
morgan.token('request_body', (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') { return JSON.stringify(req.body) }
})
app.use(morgan('tiny'))
////////////////////////////////////////////

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
  case 'CastError':
    return res.status(400).send({ error: 'malformatted id' })
  case 'ValidationError':
    return res.status(400).json({ error: error.message })
  default:
    next(error)
  }
}

app.use(express.static('build'))
app.use(express.json())

app.get('/info', (req, res) => {
  Person.find({}).then(people => {
    const time = Date(Date.now())
    const count = people.length
    res.send(`<p>Phonebook has info for ${count} people.</p><p>${time.toString()}</p>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', morgan(':method :url :status - :response-time ms :request_body'), (req, res, next) => {
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', morgan(':method :url :status - :response-time ms :request_body'), (req, res, next) => {
  Person.findById(req.params.id)
    .then(foundPerson => {
      foundPerson.number = req.body.number
      return foundPerson.save()
    })
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(unknownEndpoint)
app.use(errorHandler)