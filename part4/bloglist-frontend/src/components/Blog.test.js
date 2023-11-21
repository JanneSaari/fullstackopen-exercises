import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('Blog rendering', () => {
  const blog = {
    title: 'Some Test Title',
    author: 'Test Author',
    URL: 'some/test/url',
    likes: 2
  }

  test('Only title and author shown by default', () => {

    const { container } = render(<Blog id='test-element' blog={blog} />)
    const blogTitleElement = container.querySelector('#test-element')

    //const blogTitleElement = screen.getByText(`"${blog.title}" by ${blog.author}`)
    const likesElement = screen.queryByText(`likes: ${blog.likes}`)
    const urlElement = screen.queryByText(`URL: ${blog.URL}`)

    expect(blogTitleElement).toBeDefined()
    expect(likesElement).toBeNull()
    expect(urlElement).toBeNull()
  })
})