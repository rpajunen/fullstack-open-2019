import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { setNotification } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => props.vote(anecdote.id)}
        />
      )}
    </div>
  )
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes