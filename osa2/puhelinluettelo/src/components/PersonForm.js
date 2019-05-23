import React from 'react'

const PersonForm = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Lisaa uusi</h2>
      <div>
        nimi: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        numero: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonForm
