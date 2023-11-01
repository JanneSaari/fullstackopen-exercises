import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog.user)

  return (
    <div style={blogStyle}>
      <div>
        "{blog.title}" by {blog.author}
      </div>
      <Togglable buttonLabel="view more">
        <div>
          URL: {blog.url}
        </div>
        <div>
          Likes: {blog.likes}
          <button>Like</button>
        </div>
        <div>
          Added by: {blog.user ? blog.user.username : "name not known, this is probably default or test blog"}
        </div>
      </Togglable>
    </div>  
  )
}

export default Blog