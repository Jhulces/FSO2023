const Header = ({course}) => (<h1>{course.name}</h1>);
const Content = ({course}) => (<div>{course.parts.map((item, idx) => (<p key={idx}>{item.name} {item.exercises}</p>))}</div>);
const Total = ({course}) => (<p>Number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App;