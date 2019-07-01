import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
      {props.part} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part = {props.part1} exercise = {props.exercise1} />
      <Part part = {props.part2} exercise = {props.exercise2} />
      <Part part = {props.part3} exercise = {props.exercise3} />
    </div>
  )
}

 const Total = (props) => {
   return(
   <div>
    <p>Number of exercises {props.sum} </p>
   </div>
  )
 }

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {parts[0].name} exercise1 = {parts[0].exercises} part2 = {parts[1].name} exercise2 = {parts[1].exercises} part3 = {parts[2].name} exercise3 = {parts[2].exercises} />
      <Total sum = {parts[0].exercises + parts[0].exercises + parts[0].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
