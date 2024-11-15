const Part = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  const Content = ({ parts }) => {
    const total = parts.reduce((accu, curr) => accu + curr.exercises, 0)
  
    return (
      <div>
        <ul>{parts.map(part => <Part key={part.id} part={part} />)}</ul>
        <p><strong>total of {total} </strong></p>
      </div>
    )
  }
  
  const Header = ({ course }) => { return (<h2>{course.name}</h2>) }
  const Course = ({ courses }) => {
    return (
      <div><h1>Web development curriculum</h1>
        <div>
          {courses.map(course =>
            <div key={course.id}>
              <Header course={course} />
              <Content parts={course.parts} />
            </div>
          )}
        </div>
      </div>
    )
  }

  export default Course