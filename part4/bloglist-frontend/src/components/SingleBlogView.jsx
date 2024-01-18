import { useDispatch, useSelector } from "react-redux"
import { updateBlog, deleteBlog, addComment } from "../reducers/blogReducer";
import { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material"

const SingleBlogView = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  
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

  const handleNewComment = (event) => {
    event.preventDefault()
    
    dispatch(addComment(comment, blog))
    setComment('')
  }

  return (
    <div className="blog-element">
        <div>
          <h2>{`"${blog.title}" by ${blog.author}`}</h2>
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
        <div>
          <h3>Comments</h3>
          <form onSubmit={handleNewComment}>
              <input
                id="newComment"
                type="text"
                value={comment}
                name="Comment"
                onChange={({ target }) => setComment(target.value)}
              />
            <button id="comment-btn" type="submit">
              Add comment
            </button>
          </form>
          <List>
            {blog.comments.map(comment => 
              <ListItem key={comment}>
                <ListItemText primary={comment}/>
              </ListItem>
            )}
          </List>
        </div>
    </div>
  );
};

export default SingleBlogView;
