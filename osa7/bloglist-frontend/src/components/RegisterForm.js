// eslint-disable-next-line no-unused-vars
import React from 'react'
import { connect } from 'react-redux'
import registerService from '../services/register'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { setNotification } from '../reducers/notificationReducer'

const mapDispatchToProps = {
  setNotification
}

const RegisterForm = (props) => {
  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.register({
        username: event.target.username.value,
        name: event.target.name.value,
        password: event.target.password.value
      })
      props.setNotification(`rekisterointi onnistui kayttajanimella: ${user.username}`, 5)
      props.history.push('/')
    } catch (e) {
      props.setNotification('rekistoityminen epaonnistui', 5)
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Register
        </Header>
        <Form size='large' onSubmit={handleRegistration}>
          <Segment stacked>
            <Form.Input
              id='name'
              fluid
              icon='user'
              iconPosition='left'
              placeholder='name'
              name='name'
              {..._.omit(props.name, ['reset'])} />
            <Form.Input
              id='username'
              fluid
              icon='user'
              iconPosition='left'
              placeholder='username'
              name='username'
              {..._.omit(props.username, ['reset'])} />
            <Form.Input
              id='password'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              {..._.omit(props.password, ['reset'])} />
            <Button id='registerButton' color='teal' fluid size='large' type='submit'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='/'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(connect(null, mapDispatchToProps)(RegisterForm))