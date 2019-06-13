import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const simpleBlog = {
    title: 'title testi',
    author: 'tepa testaaja',
    likes: 12
  }

  const component = render(
    <SimpleBlog simpleBlog={simpleBlog} />
  )

  expect(component.container).toHaveTextContent(
    'title testi tepa testaajablog has 12 likes'
  )

})

it('clicking the button twice calls event handler twice', async () => {
  const simpleBlog = {
    title: 'title testi',
    author: 'tepa testaaja',
    likes: 12
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog simpleBlog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})