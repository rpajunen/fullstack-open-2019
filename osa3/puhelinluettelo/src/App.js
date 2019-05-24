import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (isNewName(newName)) {
      
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(
            `Henkilo '${returnedPerson.name}' lisatty`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log()
          setErrorMessage(error.response.data.error)
        })
    } else {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko numero uudella?`)) {

        const updatedPerson = persons.find(person => person.name === newName)
        personsService
          .update(updatedPerson.id, personObject)
          .then(returnedPerson => {
            const p = persons.filter(p => p.id !== updatedPerson.id)
            setPersons(p.concat(returnedPerson))
            setErrorMessage(
              `Henkilo '${updatedPerson.name}' numero paivitetty`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(
              `Henkilo '${updatedPerson.name}' oli jo poistettu`
            )
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const isNewName = name => persons.every(person => person.name !== name)

  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  const handleRemove = person => {
    if (window.confirm(`Do you want to remove ${person.name}`)) {
      personsService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => person.id !== p.id))
          setErrorMessage(
            `Henkilo '${person.name}' poistettu palvelimelta`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const rows = () => personsToShow.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleRemove(person)}>remove</button></li>)

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={errorMessage} />
      <Filter
        filter={filter}
        handleFilterChange={event => setFilter(event.target.value)} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={event => setNewName(event.target.value)}
        handleNumberChange={event => setNewNumber(event.target.value)} />
      <Persons rows={rows} />
    </div>
  )
}

export default App