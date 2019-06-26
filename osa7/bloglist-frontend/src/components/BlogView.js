import React from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Button } from 'semantic-ui-react'
import blogService from '../services/blogs'

import { setNotification } from '../reducers/notificationReducer'

import Comments from '../components/Comments'
import { blogByBlogId } from '../utils/helper'
import { setBlogs } from '../reducers/blogReducer'

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    blogs: state.blogs,
    blog: blogByBlogId(props.id, state.blogs)
  }
}

const mapDispatchToProps = {
  setNotification,
  setBlogs
}

const BlogView = (props) => {

  const handleLikeButtonClick = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog.id, blog)
      props.setBlogs(props.blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
      props.setNotification(`you liked '${updatedBlog.title}'`, 5)
    } catch (e) {
      props.setNotification('error liking blog', 5)
    }
  }

  const handleRemoveButtonClick = async (id, title) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove ${title}`)) {
      try {
        await blogService.remove(id)
        props.setBlogs(props.blogs.filter(blog => blog.id !== id))
        setNotification(`you removed '${title}'`, 5)
      } catch (e) {
        setNotification('error removing blog', 5)
      }
    }
  }

  if (props.blog === null) {
    return <p>blog removed</p>
  }
  return (
    <Card className='card'>
      <Card.Content>
        <Card.Header>{props.blog.title}: {props.blog.url} </Card.Header>
        <Card.Meta>
          By: {props.blog.author}
        </Card.Meta>
        <Card.Description>
          {props.blog.likes} likes
          <Button
            content='Like'
            icon='heart'
            onClick={() => handleLikeButtonClick(props.blog)}
            size='tiny'
          />
          <Comments id={props.blog.id} />

        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        Added by {props.blog.user.username}
        {(props.blog.user.username === props.user.username) && <Icon style={{ marginLeft: '3px' }} name='remove' onClick={() => handleRemoveButtonClick(props.blog.id, props.blog.title)}></Icon>}
      </Card.Content>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)