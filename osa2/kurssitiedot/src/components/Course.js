const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <p key={part.id}>{part.name} {part.exercises}</p>
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const totalNumber = (parts.map(part => part.exercises)).reduce((x,y) => x+y)
    return (
      <>
        <p><b>Total of {totalNumber} exercises</b></p>
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name = {course.name} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
      </div>
    )
  }

  export default Course