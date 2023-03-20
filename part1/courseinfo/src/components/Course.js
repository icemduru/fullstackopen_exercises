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

export default Course