// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Blog = (props) => {
  return (
    <Table.Row>
      <Table.Cell className="clickable-tag" >
        <a href={`/blogs/${props.blog.id}`} >{props.blog.title}</a>
      </Table.Cell>
      <Table.Cell className="clickable-tag" >
        {props.blog.author}
      </Table.Cell>
    </Table.Row>
  )
}

export default withRouter(Blog)