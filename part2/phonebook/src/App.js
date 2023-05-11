import { useState,useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notifStyle, setNotifStyle] = useState({color: 'green',fontStyle: 'italic', fontSize: 16})

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
      const dupIndex = duplicated[0].id
      console.log(dupIndex)
      if (window.confirm(`${duplicated[0].name} is already added to phonebook. Do you really want to update ${duplicated[0].name}?`)) {
        PersonService
        .update(dupIndex,noteObject)
        .then(updatedPerson => {
          const toUpdate = [...persons]
          console.log(toUpdate[dupIndex-1])
          toUpdate[dupIndex-1].number = noteObject.number
          setPersons(toUpdate)
          setNewName('')
          setNewNumber('')
          setNotifStyle({color: 'green', fontSize: 20, border: '5px solid purple' , padding: 10, background: 'lightgrey', marginBottom: 10})
          setErrorMessage(`${duplicated[0].name} is updated`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          console.log('updatedPerson:',updatedPerson)
        })
      }

    } else{
      PersonService
      .create(noteObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotifStyle({color: 'blue', fontSize: 20, border: '5px solid green' , padding: 10, background: 'lightgrey', marginBottom: 10})
        setErrorMessage(`${returnedPerson.name} is added to phonebook`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
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

const deletePerson = (name) =>{
  console.log(`will delete ${name}`)
  console.log(name)
  const person = persons.find(n => n.name === name)
  console.log(person)
  const idToDelete = person.id
  if (window.confirm(`Do you really want to delete ${name}?`)) { 
    PersonService
    .deletion(idToDelete)
    .then(() => {
    const toDelUpdate = persons.filter(person => person.name !== name)
    setPersons(toDelUpdate)
    setNotifStyle({color: '#7c3d00', fontSize: 20, border: '5px solid black' , padding: 10, background: '#ffffc8', marginBottom: 10})
    setErrorMessage(`${name} is deleted from phonebook`)
    setTimeout(() => {setErrorMessage(null)}, 5000)
  })
  .catch(error => {
    setNotifStyle({color: 'red', fontSize: 20, border: '5px solid red' , padding: 10, background: '#ffffc8', marginBottom: 10})
    setErrorMessage(`${name} was already removed from server`)
    setTimeout(() => {setErrorMessage(null)}, 5000)
    console.log(error)
  })  
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notifStyle={notifStyle}/>
      <Filter value={newSearch} onChange={handleSearch}/>
      <h2> add a new</h2>
      <PersonForm onSubmit={addPerson} valueName={newName} 
      valueNumber={newNumber} nameOnChange={handleNameChange}
      numberOnchange={handleNameNumber}/>
      <h2>Numbers</h2>
      <Persons numbers={toShow()} button={deletePerson} />
    </div>
  )
}

export default App