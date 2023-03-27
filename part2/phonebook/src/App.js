import { useState } from 'react'

const NumberPrint = (props) => {
  console.log("NumberPring props",props)
  return(
    <div>
      {props.numbers.map(eachNumber =>
        <p key={eachNumber.name}>{eachNumber.name} {eachNumber.number}</p>
      )}
    </div>
  )
}

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
      <form>
        <div>
          filter shown with <input value={newSearch} onChange={handleSearch} />
        </div>
      </form>
      <h2> add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br></br>
          number: <input value={newNumber} onChange={handleNameNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NumberPrint numbers={toShow()} />
    </div>
  )
}

export default App