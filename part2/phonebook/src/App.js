import { useState,useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    PersonService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNameNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }

    const duplicated = persons.filter(person => person.name === noteObject.name)
    console.log("duplicated",duplicated)

    if (duplicated.length) {
      alert(`${newName} is already added to phonebook`)
    } else{
      PersonService
      .create(noteObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleSearch = (event) => {
    setnewSearch(event.target.value)
  }

 const toShow = () => {
  if (newSearch.length){
    const newSearchlower = newSearch.toLowerCase()
    console.log("newSearchlower log:",newSearchlower)
    const newPersons = persons.filter(person => person.name.toLowerCase().includes(newSearchlower))
    console.log("persons log", persons)
    console.log("newPersons log", newPersons)
    return (newPersons)
  } else{
    return(persons)
  }
 }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearch}/>
      <h2> add a new</h2>
      <PersonForm onSubmit={addPerson} valueName={newName} 
      valueNumber={newNumber} nameOnChange={handleNameChange}
      numberOnchange={handleNameNumber}/>
      <h2>Numbers</h2>
      <Persons numbers={toShow()} />
    </div>
  )
}

export default App