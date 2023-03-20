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
    <p><b>Total of {totalEx} exercises</b></p>
  )
}

const Course = (props) => {
  console.log('course_props', props)
  console.log('course_props_name', props.course.name)
  return(
    <div>
      {props.course.map(eachCourse => {
        return(
          <div>  
          <Header title={eachCourse.name} />
          <Content content={eachCourse.parts} />
          <Total parts={eachCourse.parts} />
          </div>
        )}
      )}
      </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

export default App