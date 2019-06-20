// eslint-disable-next-line no-unused-vars
import React from 'react'
import { connect } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'

const mapDispatchToProps = {
  setNotification,
  loginUser
}

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginUser({
        username: event.target.username.value,
        password: event.target.password.value,
      })
    } catch (exception) {
      props.setNotification('käyttäjätunnus tai salasana virheellinen', 5)
    } finally {
      props.username.reset()
      props.password.reset()
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

export default connect(null, mapDispatchToProps)(LoginForm)