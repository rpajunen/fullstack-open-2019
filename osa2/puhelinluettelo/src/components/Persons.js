import React from 'react'

const Persons = ({ rows }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default Persons