import React from 'react'

const Login = ({ name, handleLogout }) => {
  if (name === undefined) {
    return null
  }

  return (
    <div>
      <p>{name} logged in</p>
      <p><button onClick={handleLogout}>logout</button></p>
    </div>
  )
}

export default Login