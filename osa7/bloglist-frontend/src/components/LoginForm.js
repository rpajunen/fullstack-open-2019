// eslint-disable-next-line no-unused-vars
import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

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
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='username' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
            />

            <Button color='teal' fluid size='large' type='submit'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='register'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))