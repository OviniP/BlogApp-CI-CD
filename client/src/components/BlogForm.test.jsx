import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form has Create Button', () => {
    const mockHandler = vi.fn()
    render(<BlogForm createPost = {mockHandler}></BlogForm>)
    const createButton = screen.getByText('Create')
    expect(createButton).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    render(<BlogForm createPost = {mockHandler}></BlogForm>)
    const createButton = screen.getByText('Create')
    await user.click(createButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('clicking button will call the handler with right object', async () => {
    const newBlog = {
        title : 'new Title',
        author : 'author',
        url: 'http://test.com'
    }
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    render(<BlogForm createPost = {mockHandler}></BlogForm>)
    const title = screen.getAllByRole('textbox')[0]//screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    await user.type(title, newBlog.title)
    await user.type(author, newBlog.author)
    await user.type(url, newBlog.url)
    const createButton = screen.getByText('Create')
    await user.click(createButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual(newBlog)
})