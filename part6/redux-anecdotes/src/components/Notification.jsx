import { useSelector } from "react-redux"

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notifications ? 'visible' : 'hidden'
  }

  console.log('notification', notifications)

  return (
    <div>
      <div style={style}>
        {notifications}
      </div>
    </div>
  )
}

export default Notification