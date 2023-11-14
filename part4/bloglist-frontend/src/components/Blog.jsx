import Togglable from "./Togglable"
import { useState } from 'react'

const Blog = ({ blog, updateBlogFn }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    
    console.log(blog)
    let updatedBlog = { ...blog }
    console.log(updatedBlog)
    updatedBlog.likes = updatedBlog.likes + 1
    console.log(updatedBlog)
    updateBlogFn(updatedBlog)
  }

  console.log(blog.user)

  return (
    <div style={blogStyle}>
      {/* <Togglable buttonLabel="view more" text={`"${blog.title}" by ${blog.author}`}> */}
      <Togglable text={`"${blog.title}" by ${blog.author}`}>
        "{blog.title}" by {blog.author}
        <div>
          URL: {blog.url}
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={addLike}>Like</button>
        </div>
        <div>
          Added by: {blog.user ? blog.user.username : "name not known, this is probably default or test blog"}
        </div>
      </Togglable>
    </div>  
  )
}

export default Blog