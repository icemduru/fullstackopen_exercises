const Header = (props) => {
  console.log('header_props', props)
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.name} {props.ex}</p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      {props.content.map(eachContent =>
        <Part key={eachContent.id} name={eachContent.name} ex={eachContent.exercises} />
      )}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const totalEx = props.parts.reduce((accumulator, currentValue) => {
    console.log('what is happening', accumulator, currentValue)
    return (accumulator + currentValue.exercises)
  },0)
  console.log('total:', totalEx)
  return(
    <p>Total {totalEx}</p>
  )
}

const Course = (props) => {
  console.log('course_props', props)
  console.log('course_props_name', props.course.name)
    return(
      <div>
        <Header title={props.course.name} />
        <Content content={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Testing for additional content',
        exercises: 213,
        id:4
      }
    ]
  }

  return <Course course={course} />
}

export default App