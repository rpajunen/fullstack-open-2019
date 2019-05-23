import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
  return <h1>{props.course}</h1>
}

const Part = props => {
  return <p>{props.content.name} {props.content.exercises}</p>
}

const Content = (props) => {
  return (
    <div>
      <Part content={props.courses[0]} />
      <Part content={props.courses[1]} />
      <Part content={props.courses[2]} />
    </div>
  )
}

const Total = (props) => {
  return <p>Yhteensa {props.total} tehtavaa</p>
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content courses={course.parts} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))