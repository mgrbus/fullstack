import { useState, useEffect } from 'react'
import { create, remove, update, getAll } from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Content from './components/Content'
import AddingNotification from './components/AddingNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getAll().then(recievedPersons => setPersons(recievedPersons))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchName = (event) => setSearchName(event.target.value)


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const haveName = persons.some(person => person.name === newName)
    const haveNumber = persons.some(person => person.number === newNumber)

    if (haveName && haveNumber) {
      alert(`${newName} is already added to phonebook`)
    } else if (haveName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToFind = persons.find(p => p.name === newName)
        const id = personToFind.id
        const updatedPerson = { ...personToFind, number: newNumber }
        update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setMessage(`${returnedPerson.name} got new number ${returnedPerson.number}`)
            setTimeout(() => setMessage(null), 5000)
           })
           .catch(error => {
            alert(`Person ${newName} was already deleted from server`)
            setPersons(persons.filter(p=>p.id!==id))
           })
      }
    } else {
      create(newPerson)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setMessage(`Added ${returnedData.name}`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error=>{
          alert('Name must me minimum three characters long')
          console.log(error.response.data.error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      remove(personToDelete.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }


  const filterPersons = () => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase() === searchName.toLowerCase()))
    setTimeout(() => setFilteredPersons([]), 5000)
    setSearchName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <AddingNotification message={message} />
      <Filter filterPersons={filterPersons} handleSearchName={handleSearchName} searchName={searchName} filteredPersons={filteredPersons} />
      <Content addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App