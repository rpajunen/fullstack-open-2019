import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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
      <Blog blog={blog} user={user}></Blog>
    )
  })

  it('at start title and author are displayed', () => {
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('blogin title tepa testaaja')
  })

  it('after clicking the a tag, likes are displayed', () => {
    const button = component.container.querySelector('.clickable-tag')

    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('blogin title tepa testaaja 12 likes likeAdded by remove')
  })

})