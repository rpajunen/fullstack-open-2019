import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  return props.notification !== '' ?
    <Message>
      <Message.Header>{props.notification}</Message.Header>
    </Message> :
    null
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)