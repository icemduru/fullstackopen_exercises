const Persons = (props) => {
    console.log("NumberPring props",props)
    return(
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {props.numbers.map(eachNumber =>
          <li key={eachNumber.name}>{eachNumber.name} {eachNumber.number}
          <button onClick={() => props.button(eachNumber.name)}>Delete</button>
          </li>
        )}
      </ul>
    )
  }

export default Persons