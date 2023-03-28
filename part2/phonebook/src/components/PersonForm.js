const PersonForm = (props) => {
    console.log("PersonForm props",props)
    return(
      <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.valueName} onChange={props.nameOnChange} />
        <br></br>
        number: <input value={props.valueNumber} onChange={props.numberOnchange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default PersonForm