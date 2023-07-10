const Header = ({course}) => (<h1>{course}</h1>);
const Content = ({parts}) => (<div>{parts.map((item, idx) => (<p key={idx}>{item.name} {item.exercises}</p>))}</div>);
const Total = ({parts}) => (<p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>);

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
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App;
