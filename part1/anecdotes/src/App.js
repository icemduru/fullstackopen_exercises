import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [maxIndex, setmaxIndex] = useState(0)

  const randomer = () => {
    const randomNumer = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumer)
  }

  const voter = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    const maxInd = copy.indexOf(Math.max(...copy))
    setmaxIndex(maxInd)

  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <Button handleClick={voter} text="vote" />
      <Button handleClick={randomer} text="next anecdote" />
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {points[maxIndex]} points</p>

    </div>
  )
}

export default App