import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Full Stack4',
    author: 'Ovini123456',
    url: 'http://test.com',
    likes: '2'
  }

  render(<Blog blog={ blog }></Blog>)

  const header = screen.getByTestId('blog-header')
  expect(header).toHaveTextContent(blog.title)
  expect(header).toHaveTextContent(blog.author)
  const content = screen.queryByTestId('blog-content')
  expect(content).toBeNull()
})

test('clicking the show button, shows the url and likes', async() => {
    const blog = {
        title: 'Full Stack4',
        author: 'Author',
        url: 'http://test.com',
        likes: '2',
        user: {
            name: 'created User'
        }
      }
    
    render(<Blog blog={ blog }></Blog>)
    const user = userEvent.setup()

    const showButton = screen.getByText('View')
    await user.click(showButton)
    const content = screen.queryByTestId('blog-content')

    expect(content).toBeDefined()
    expect(content).toHaveTextContent(blog.url)
    expect(content).toHaveTextContent(blog.likes)
})

test('when the like button is clicked twice, then the event is called twice', async() => {
    const blog = {
        title: 'Full Stack4',
        author: 'Author',
        url: 'http://test.com',
        likes: '2',
        user: {
            name: 'created User'
        }
      }
    const updateHandler = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog = { blog } updateBlog = {updateHandler}></Blog>)
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(updateHandler.mock.calls).toHaveLength(2)
})