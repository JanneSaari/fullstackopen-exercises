import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title</label><br></br>
          <input
            id='title-field'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author</label><br></br>
          <input
            id='author-field'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>URL</label><br></br>
          <input
            id='url-field'
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          id='add-blog-btn'
          type="submit"
        >Add</button>
      </form>
    </div>
  )
}

export default BlogForm