const Users = ({ users }) => {
  if(!users){
    return (
      <div>loading data...</div>
    )
  }

  return (
    <div>
      {users.map(user => {
        return (
          <a key={user.id}>{user.name}</a>
        )}
      )}
    </div>
  )
}

export default Users