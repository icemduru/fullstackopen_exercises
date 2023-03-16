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

const StatisticLine = (props) =>{
  console.log(props)
  return(
    <div>
      <p>{props.text} {props.number}</p>
    </div>
  )
}

const Stats = (props) =>{
  console.log(props)
  if (props.number1 > 0 || props.number2 > 0 || props.number3 > 0) {
    return(
      <div>
        <StatisticLine text={props.text1} number={props.number1} />
        <StatisticLine text={props.text2} number={props.number2} />
        <StatisticLine text={props.text3} number={props.number3} />
        <StatisticLine text={props.text4} number={props.number4} />
        <StatisticLine text={props.text5} number={props.number5} />
        <StatisticLine text={props.text6} number={props.number6} />
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given.</p>
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

  const total = good+neutral+bad
  const average = (good-bad)/total
  const positive = good/total+" %"

  return (
    <div>
      <Title text="Give Feedback" />
      <Button handleClick={giveGood} text="good" />
      <Button handleClick={giveNeutral} text="neutral" />
      <Button handleClick={giveBad} text="bad" />
      <Title text="Statistics" />
      <Stats text1="Good" number1={good}
      text2="Neutral" number2={neutral}
      text3="Bad" number3={bad}
      text4="All" number4={total}
      text5="average" number5={average}
      text6="positive" number6={positive}  />
    </div>
  )
}

export default App