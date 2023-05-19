const express = require('express')
const morgan = require('morgan')
const app = express()

const randomBetween = (a,b) => {
  return Math.floor(Math.random() * (b-a) + a)
}

let persons = [
        {
          "name": "Arto Hellas",
          "number": "040-123456",
          "id": 1
        },
        {
          "name": "Ada Lovelace",
          "number": "39-44-5323523",
          "id": 2
        },
        {
          "name": "Dan Abramov",
          "number": "12-43-234345",
          "id": 3
        },
        {
          "name": "Mary Poppendick",
          "number": "39-23-6423122",
          "id": 4
        }
]

morgan.token('request_body', (req, res) => {
  if (req.method == 'POST') { return JSON.stringify(req.body) }
})
app.use(morgan('tiny'))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.use(express.json())

app.get('/info', (req, res) => {
  const time = Date(Date.now())
  res.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${time.toString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

app.post('/api/persons', morgan(':method :url :status - :response-time ms :request_body'), (req, res) => {
  const person = {...req.body, id: randomBetween(100, 1000000)}
  if (persons.filter(p => p.name === person.name).length) {
    res.status(400).send({error: 'name must be unique'})
  } else if (person.name && person.number) {
    persons = [...persons, person]
    res.status(200).json(person)
  } else {
    res.status(400).send({error: 'name or number missing' })
  }
})

app.put('/api/persons/:id', (req, res) => {
  const number = req.body.number
  const id = Number(req.params.id)
  console.log(number, id)
  persons = persons.map(p => p.id === id ? {...p, number: number} : p)
  res.status(200).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  console.log(persons)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})