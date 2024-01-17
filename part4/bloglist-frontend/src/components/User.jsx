import { Link, List, ListItemText } from "@mui/material"

const User = ({user}) => {
  if(!user){
    return (
      <div>loading data...</div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      <List>
        {user.blogs.map(blog =>
          <ListItemText key={blog.id} primary={blog.title} >
          </ListItemText>
        )}
      </List>
    </div>
  )
}

export default User