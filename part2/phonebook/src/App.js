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
    { name: 'Arto Hellas', number: 234 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <NumberPrint numbers={persons} />
    </div>
  )
}

export default App