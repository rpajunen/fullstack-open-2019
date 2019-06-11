import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Anecdote from './components/Anecdote';

const Menu = ({ anecdotes, addNew, anecdoteById }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/about">about</Link>
          </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" render={() => <CreateNew addNew={addNew} />} />
          <Route path="/about" render={() => <About />} />
          
          <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          } />
        </div>
      </Router>
    </div >
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`added ${anecdote.content}`)
    setTimeout(() => {
      setNotification('')

    }, 5000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification}
      <Menu anecdotes={anecdotes} addNew={addNew} anecdoteById={anecdoteById} />
      <Footer />
    </div>
  )
}

export default App;