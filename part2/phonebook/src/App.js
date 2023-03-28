import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')

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
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
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