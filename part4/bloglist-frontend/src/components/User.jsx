import { List, ListItemText } from "@mui/material"
import { useParams } from "react-router-dom"

const User = ({users}) => {
  if(!users){
    return (
      <div>loading data...</div>
    )
  }

  const id = useParams().id
  const user = users.find(user => user.id === id)
  console.log('users:', users, 'user', user)
  if(!user){
    return (
      <div>Couldn't find user with this id</div>
    )
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      <List>
        {user.blogs.map(blog =>
          <ListItemText key={blog.id} primary={blog.title} />
        )}
      </List>
    </div>
  )
}

export default User