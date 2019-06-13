// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus <input {..._.omit(username, ['reset'])} />
        </div>
        <div>
          salasana <input {..._.omit(password, ['reset'])} />
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