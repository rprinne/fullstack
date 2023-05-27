import { useEffect, useState } from 'react'
import dbService from './services'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [which, setWhich] = useState("error")

  useEffect(()=> {
    dbService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const includes = (s) => {
    return persons.map(person => person.name.toUpperCase()).includes(s.toUpperCase())
  }

  const updateFilter = (event) => {
    setFilter(event.target.value.toUpperCase())
  }

  const addName = (event) => {
    event.preventDefault()
    if (newName === '' || newName === undefined || newNumber === '' || newNumber === undefined) {return}
    const newPerson = {name: newName, number: newNumber}
    if (!includes(newName)) {
      dbService.create(newPerson)
        .then(newEntry => {
          const updatedPersons = persons.concat(newEntry)
          setPersons(updatedPersons)
          handleNotification(`Added ${newName}`, "success")
        })
        .catch(error => {
          handleNotification(`${error.response.data.error}`, "error")
        })
    } else if (window.confirm(`${newName} is already added to phonebook,
     replace the old number with a new one?`)) {
      const id = persons.filter(p => p.name === newName)[0].id
      const updatedPerson = { name: newName, number: newNumber }
      dbService.update(id, updatedPerson)
      .then(updatedEntry => {
        const newPersons = persons.map(p => p.name === newName ? {...p, number: newNumber} : p)
        setPersons(newPersons)
      })
      .catch(error => {
        handleNotification(`${error.response.data.error}`, "error")
      })
    }
  }

  const removeName = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}?`)){
      dbService
        .remove(person.id)
        .then(res => {
          const updatedPersons = persons.filter(p => p.id !== person.id)
          setPersons(updatedPersons)
        })
        .catch(error => {
          handleNotification(`${person.name} was already deleted from server`, "error")
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNotification = (m, w) => {
    setErrorMessage(m)
    setWhich(w)
    setTimeout(()=> {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} which={which}/>
      <Filter updateFilter={updateFilter}/>
      <h2>Add new</h2>
      <PersonForm addName={addName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} removeName={removeName}/>
    </div>
  )
}

export default App