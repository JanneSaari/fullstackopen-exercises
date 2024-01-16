import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";

import loginService from "./services/login";
import useResource from "./services/resource";

import { setNotification } from "./reducers/notificationReducer";
import blogReducer, {initializeBlogs, addBlog } from "./reducers/blogReducer";
import userReducer, {setUser} from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();
  
  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogService = useResource('/api/blogs')
  const usersService = useResource('/api/users')

  const users = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  })
  // console.log(JSON.parse(JSON.stringify(users)))
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      console.log('user: ', user)
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user))
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong credentials"))
      console.log("testing")
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logging user out", currentUser.username);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedAppUser");
    dispatch(setNotification(`User ${currentUser.username} is logged out`))
    dispatch(setUser(null));
  };

  const createBlog = async (blogObject) => {
    const newBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
    };

    blogFormRef.current.toggleVisibility();
    console.log('new blog', newBlog);

    dispatch(addBlog(newBlog))
    dispatch(setNotification(`Blog "${newBlog.title}" by ${newBlog.author} added`));
  };

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );

  const blogList = () => {
    console.log('Blogs: ', blogs)
    return (
    <div>
      <h2>blogs</h2>
      {blogs
        .toSorted((a, b) => {
          // console.log("sorting", a, b);
          const result = a.likes <= b.likes;
          // console.log(result);
          return result;
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            currentUsername={currentUser.username}
          />
        ))}
    </div>
  )};

  return (
    <div>
      <Notification/>
      {console.log('currentUser: ', currentUser)}
      {!currentUser && loginForm()}
      {currentUser && (
        <p>
          {currentUser.username} has logged in{" "}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </p>
      )}
      {currentUser && (
        <Togglable
          buttonLabel="new blog"
          cancelLabel="show less"
          ref={blogFormRef}
        >
          <BlogForm createBlog={createBlog} />
        </Togglable>
      )}
      <Routes>
        {/* <Route path="users" element={<Users users={users}/>} /> */}
      </Routes>
      {currentUser && blogList()}
    </div>
  );
};

export default App;
