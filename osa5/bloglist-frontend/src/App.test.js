import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  it('renders login button when user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

  })

  it('renders blogs from backdend', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('Title of blog1 Author of the blog1')

  })

  xit('shows logout button when user is logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))



  })


})