const Header = ({name}) => <h1>{name}</h1>;

const Part = ({parts}) => {
  return (
    <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <p><strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong></p>
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name}/>
            <Part parts={course.parts}/>
          </div>
        )
      })}
    </div>
  )
}

export default Course