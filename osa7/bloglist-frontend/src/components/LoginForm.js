// eslint-disable-next-line no-unused-vars
import React from 'react'

const LoginForm = ({ username, password, loginUser, setNotification }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      loginUser({
        username: event.target.username.value,
        password: event.target.password.value,
      })
    } catch (exception) {
      setNotification('käyttäjätunnus tai salasana virheellinen', 5)
    } finally {
      username.reset()
      password.reset()
    }
  }

  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus <input type='text' name='username' />
        </div>
        <div>
          salasana <input type='password' name='password' />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm