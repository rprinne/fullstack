require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

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

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }
  next(error)
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

app.post('/api/persons', morgan(':method :url :status - :response-time ms :request_body'), (req, res) => {
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({error: 'content missing'})
  }
  const person = new Person({
    name: body.name,
    number: body.number || 0
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.put('/api/persons/:id', morgan(':method :url :status - :response-time ms :request_body'), (req, res, next) => {
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({error: 'name missing'})
  }
  if (body.number === undefined) {
    return res.status(400).json({error: 'number missing'})
  }
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)