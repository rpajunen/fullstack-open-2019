// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const RegisterForm = ({
  handleSubmit,
  username,
  password,
  name
}) => {
  return (
    <div>
      <h2>Rekisteroidy</h2>

      <form onSubmit={handleSubmit}>
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

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default RegisterForm