import { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)}

const Title = (props) =>{
  console.log(props)
  return(
    <div>
      <h1>{props.text}</h1>
    </div>
)}

const Stats = (props) =>{
  console.log(props)
  return(
    <div>
      <p>{props.text} {props.number}</p>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => {
    const newgood = good+1
    setGood(newgood)
  }

  const giveNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
  }

  const giveBad = () => {
    const newBad = bad+1
    setBad(newBad)
  }

  return (
    <div>
      <Title text="Give Feedback" />
      <Button handleClick={giveGood} text="good" />
      <Button handleClick={giveNeutral} text="neutral" />
      <Button handleClick={giveBad} text="bad" />
      <Title text="Statistics" />
      <Stats text="Good" number={good} />
      <Stats text="Neutral" number={neutral} />
      <Stats text="Bad" number={bad} />
    </div>
  )
}

export default App