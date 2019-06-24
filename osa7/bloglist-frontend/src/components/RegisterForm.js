// eslint-disable-next-line no-unused-vars
import React from 'react'
import registerService from '../services/register'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

const RegisterForm = (props) => {
  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.register({
        username: props.username.value,
        name: props.name.value,
        password: props.password.value
      })
      props.setNotification(`rekisterointi onnistui kayttajanimella: ${user.username}`, 5)
      props.history.push('/')
    } catch (e) {
      props.setNotification('rekistoityminen epaonnistui', 5)
    } finally {
      props.name.reset()
      props.password.reset()
      props.username.reset()
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
              fluid
              icon='user'
              iconPosition='left'
              placeholder='name'
              name='name'
              {..._.omit(props.name, ['reset'])} />
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='username'
              name='username'
              {..._.omit(props.username, ['reset'])} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              {..._.omit(props.password, ['reset'])} />
            <Button color='teal' fluid size='large' type='submit'>
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

export default withRouter(RegisterForm)