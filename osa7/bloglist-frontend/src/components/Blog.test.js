import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'
import { BrowserRouter as Router } from 'react-router-dom'

afterEach(cleanup)

const blog = {
  title: 'blogin title',
  author: 'tepa testaaja',
  likes: 12,
  user: {
    username: 'jonny'
  }
}

const user = {
  username: 'jonny'
}


describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <Blog blog={blog} user={user}></Blog>
      </Router>
    )
  })

  it('at start title and author are displayed', () => {
    const titleCell = component.container.querySelector('.title-cell')
    expect(titleCell).toHaveTextContent('blogin title')

    const authorCell = component.container.querySelector('.author-cell')
    expect(authorCell).toHaveTextContent('tepa testaaja')
  })

})