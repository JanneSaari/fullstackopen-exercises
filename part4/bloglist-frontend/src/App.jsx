import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isNotificationError, setIsNotificationError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setIsNotificationError(true)
      setTimeout(() => {
        setNotification(null)
        setIsNotificationError(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging user out', user.username)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedAppUser')
    setNotification(`User ${user.username} is logged out`)
    setIsNotificationError(false)
    setTimeout(() => {
      setNotification(null)
      setIsNotificationError(false)
    }, 5000)
    setUser(null)
  }

  const createBlog = async ( blogObject) => {
    const newBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url
    }

    blogFormRef.current.toggleVisibility()
    console.log(newBlog)
    await blogService.addBlog(newBlog)
    setNotification(`Blog "${newBlog.title}" by ${newBlog.author} added`)
    setIsNotificationError(false)

    const foo = await blogService.getAll()
    setBlogs(foo)
}

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>      
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {console.log(user)}
      <p>{user.username} has logged in <button type='button' onClick={handleLogout}>Logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  return (
    <div>
      <Notification message={notification} isError={isNotificationError}/>
      {!user && loginForm()}
      {user && blogList()}
      {user && 
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>}
    </div>
  )
}

export default App