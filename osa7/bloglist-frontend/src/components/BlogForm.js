// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button, Form, Header, Grid, Segment } from 'semantic-ui-react'
import _ from 'lodash'

const BlogForm = ({ onSubmit, title, author, url }) => (
  <div>
    <Grid>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
          Add new blog
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon='header'
              iconPosition='left'
              placeholder='Title'
              name='title'
              {..._.omit(title, ['reset'])} />
            <Form.Input
              fluid
              icon='book'
              iconPosition='left'
              placeholder='Author'
              name='author'
              {..._.omit(author, ['reset'])} />
            <Form.Input
              fluid
              icon='pencil alternate'
              iconPosition='left'
              placeholder='Url'
              name='url'
              {..._.omit(url, ['reset'])} />
            <Button primary fluid size='large' type='submit'>
              Create
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
)

export default BlogForm