import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const Anecdotes = ({ store }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {AnecdotesToShow(store.getState().anecdotes, store.getState().filter).map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              store.dispatch(vote(anecdote.id))
              store.dispatch(setNotification('You voted "' + anecdote.content + '"'))
              setTimeout(() => {
                store.dispatch(setNotification(''))
              }, 5000);
            }}
          />
        )}
      </ul>

    </div>
  )
}

export default Anecdotes
