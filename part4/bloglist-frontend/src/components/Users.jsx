const Users = ({ users }) => {
  return (
    <div>
      {users.map(user => {
        return (
          <a>{user.name}</a>
        )}
      )}
    </div>
  )
}

export default Users