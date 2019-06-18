// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm