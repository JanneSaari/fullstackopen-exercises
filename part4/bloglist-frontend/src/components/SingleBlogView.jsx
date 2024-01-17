import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux"
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

const SingleBlogView = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const currentUser = useSelector(state => state.currentUser)
  
  const blog = blogs.find(blog => blog.id === id)
  if(!blog){
    return (
      <div>Couldn't find blog with this id</div>
    )
  }
  if(!currentUser){
    return (
      <div>Loading...</div>
    )
  }
  const currentUsername = currentUser.username


  const addLike = (event) => {
    event.preventDefault();
    let updatedBlog = { ...blog };
    updatedBlog.likes = updatedBlog.likes + 1;
    dispatch(updateBlog(updatedBlog))
  };

  const deleteFn = (event) => {
    event.preventDefault();
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  };

  return (
    <div className="blog-element">
        <div>
          {`"${blog.title}" by ${blog.author}`}
        </div>
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
    </div>
  );
};

export default SingleBlogView;
