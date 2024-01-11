import Togglable from "./Togglable";
import { useState } from "react";

const Blog = ({ blog, currentUsername, updateBlogFn, deleteBlogFn }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = (event) => {
    event.preventDefault();

    console.log(blog);
    let updatedBlog = { ...blog };
    console.log(updatedBlog);
    updatedBlog.likes = updatedBlog.likes + 1;
    console.log(updatedBlog);
    updateBlogFn(updatedBlog);
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogFn(blog);
    }
  };

  // console.log(blog.user);

  return (
    <div className="blog-element" style={blogStyle}>
      <Togglable
        text={`"${blog.title}" by ${blog.author}`}
        buttonLabel="show more"
        cancelLabel="show less"
      >
        {`"${blog.title}" by ${blog.author}`}
        <div>URL: {blog.url}</div>
        <div className="likes-element">
          Likes: {blog.likes}
          <button className="like-blog-btn" onClick={addLike}>
            Like
          </button>
        </div>
        <div>
          Added by:{" "}
          {blog.user
            ? blog.user.username
            : "name not known, this is probably default or test blog"}
        </div>
        {blog.user.username === currentUsername ? (
          <div>
            <button onClick={deleteBlog}>Delete blog</button>
          </div>
        ) : (
          ""
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
