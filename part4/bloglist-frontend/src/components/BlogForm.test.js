import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const textBoxes = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('Add')

    expect(textBoxes).toBeDefined()
    expect(sendButton).toBeDefined()

    await user.type(textBoxes[0], 'testing title')
    await user.type(textBoxes[1], 'testing author')
    await user.type(textBoxes[2], 'testing URL')
    await user.click(sendButton)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing URL')
  })
})