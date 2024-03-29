import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { useMatch } from "react-router-dom";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import User from "./components/User";
import LoginForm from "./components/LoginForm";

import { setNotification } from "./reducers/notificationReducer";
import blogReducer, {initializeBlogs, addBlog } from "./reducers/blogReducer";
import userReducer, {setUser} from "./reducers/currentUserReducer";
import SingleBlogView from "./components/SingleBlogView";
import { AppBar, Toolbar } from "@mui/material";
import { Button } from "@mui/base";

const App = () => {
  const blogFormRef = useRef();
  
  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const blogMatch = useMatch('blogs/:id')
  const matchedBlog = blogMatch 
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('http://localhost:5173/api/users').then(res => res.data)
  })
  console.log('users: ', JSON.parse(JSON.stringify(usersQuery)))
  let users
  let matchedUser
  const userMatch = useMatch('users/:id')
  if(usersQuery.isSuccess)
  {
    users = usersQuery.data
    matchedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null
    console.log(users)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      console.log('user: ', user)
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logging user out", currentUser.username);
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
          />
        ))}
    </div>
  )};

  const padding = {
    padding: 5
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          {/* <Link style={padding} to="/">home</Link> */}
          {/* <Link style={padding} to="/users">users</Link> */}
          {currentUser
            ? <span>
                <em>{currentUser.username} has logged in </em>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                {/* <button type="button" onClick={handleLogout}>
                  Logout
                </button> */}
              </span>
            // : <Link style={padding} to='login'>login</Link>
            : <Button color="inherit" component={Link}>Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Notification/>
      {console.log('currentUser: ', currentUser)}
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
        <Route path="/users" element={<Users users={users}/>} />
        <Route path="/users/:id" element={<User user={matchedUser}/>}></Route>
        <Route path="/blogs/:id" element={<SingleBlogView blog={matchedBlog}/>}></Route>
        <Route path="/" element={currentUser ? blogList() :  <LoginForm/>}/>
        <Route path="/login" element={currentUser ? <Navigate replace to='/'/>: <LoginForm/>} />
      </Routes>
     
    </div>
  );
};

export default App;
