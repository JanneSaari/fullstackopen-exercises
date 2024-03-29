import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux"
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const currentUsername = currentUser.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = (event) => {
    event.preventDefault();

    let updatedBlog = { ...blog };
    console.log("blog to update: ", updatedBlog);
    updatedBlog.likes = updatedBlog.likes + 1;
    console.log("updated blog: ", updatedBlog);
    dispatch(updateBlog(updatedBlog))
  };

  const deleteFn = (event) => {
    event.preventDefault();
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  };

  return (
    <div className="blog-element" style={blogStyle}>
      <Togglable
        text={`"${blog.title}" by ${blog.author}`}
        buttonLabel="show more"
        cancelLabel="show less"
      >
        <Link to={`/blogs/${blog.id}`}>
          {`"${blog.title}" by ${blog.author}`}
        </Link>
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
            <button onClick={deleteFn}>Delete blog</button>
          </div>
        ) : (
          ""
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
