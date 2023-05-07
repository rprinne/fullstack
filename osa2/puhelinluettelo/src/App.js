import { useState } from 'react'

const Filter = ({updateFilter}) => {
  return (
    <form>
      <div>
        filter shown with 
        <input 
          onChange={updateFilter}
        />
      </div>
    </form>
  )
}

const PersonForm = ({addName, newName, handleNameChange,
                    newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
    <div>
      name: 
      <input
        value={newName} 
        onChange={handleNameChange}
      />
    </div>
    <div>
      number: 
      <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({filter, persons}) => {
  const filtered = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  return (
    <div>
      {filtered.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const includes = (s) => {
    return persons.map(person => person.name.toUpperCase()).includes(s.toUpperCase())
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (!includes(newName)) {
      setPersons(persons.concat({name: newName, number: newNumber}))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter updateFilter={updateFilter}/>
      <h2>Add new</h2>
      <PersonForm addName={addName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons}/>
    </div>
  )

}

export default App