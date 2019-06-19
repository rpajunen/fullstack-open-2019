// eslint-disable-next-line no-unused-vars
import React from 'react'
import registerService from '../services/register'
import _ from 'lodash'

const RegisterForm = ({
  username,
  password,
  name,
  setNotification
}) => {
  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.register({
        username: username.value,
        name: name.value,
        password: password.value
      })
      setNotification(`rekisterointi onnistui kayttajanimella: ${user.username}`, 5)
    } catch (e) {
      setNotification('rekistoityminen epaonnistui', 5)
    } finally {
      name.reset()
      password.reset()
      username.reset()
    }
  }
  return (
    <div>
      <h2>Rekisteroidy</h2>

      <form onSubmit={handleRegistration}>
        <div>
          nimi <input {..._.omit(name, ['reset'])} />
        </div>
        <div>
          käyttäjätunnus <input {..._.omit(username, ['reset'])} />
        </div>
        <div>
          salasana <input {..._.omit(password, ['reset'])} />
        </div>
        <button type="submit">rekisteroidy</button>
      </form>
    </div>
  )
}

export default RegisterForm