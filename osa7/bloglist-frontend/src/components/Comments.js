import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Input, Form, Button } from 'semantic-ui-react'

import blogService from '../services/blogs'

const mapDispatchToProps = {
  setNotification
}

const Comments = (props) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    blogService.getComments(props.id).then(comments => {
      setComments(comments)
    })
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const value = event.target.comment.value
    event.target.comment.value = ''

    try {
      const commentObject = {
        comment: value
      }
      const comment = await blogService.addComment(props.id, commentObject)
      setComments(comments.concat(comment))
      props.setNotification(`you commented '${commentObject.comment}'`, 5)
    } catch (e) {
      console.log('error')
    }
  }

  return (
    <div style={{ marginTop: '5px' }}>
      Comments:
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
      <Form onSubmit={onSubmit}>
        <Input type='text' name='comment' />
        <Button type='submit'>add comment</Button>
      </Form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Comments)