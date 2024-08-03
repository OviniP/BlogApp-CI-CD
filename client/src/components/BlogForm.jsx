import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addPost = (event) => {
    //console.log('create post is called')
    event.preventDefault()

    const newPost = {
      title,
      author,
      url
    }
    //console.log(newPost)
    //console.log('--------------------------------')
    createPost(newPost)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addPost}>
      <h2>Create New</h2>
      <div>
          Title
        <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} placeholder='title'></input>
      </div>
      <div>
          Author
        <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='author'></input>
      </div>
      <div>
          url
        <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} placeholder='url'></input>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createPost : PropTypes.func.isRequired
}
export default BlogForm