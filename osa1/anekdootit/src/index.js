import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const MostVoted = ({ anecdote }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdote}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const castVote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={() => castVote(selected)} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length + 0))} text="next anecdote" />
      <MostVoted anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)