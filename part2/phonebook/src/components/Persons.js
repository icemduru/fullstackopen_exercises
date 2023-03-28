const Persons = (props) => {
    console.log("NumberPring props",props)
    return(
      <div>
        {props.numbers.map(eachNumber =>
          <p key={eachNumber.name}>{eachNumber.name} {eachNumber.number}</p>
        )}
      </div>
    )
  }

export default Persons