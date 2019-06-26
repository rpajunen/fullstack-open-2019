// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Blog = (props) => {
  return (
    <Table.Row>
      <Table.Cell className="title-cell" >
        <a className="blog-link" href={`/blogs/${props.blog.id}`} >{props.blog.title}</a>
      </Table.Cell>
      <Table.Cell className="author-cell" >
        {props.blog.author}
      </Table.Cell>
    </Table.Row>
  )
}

export default withRouter(Blog)