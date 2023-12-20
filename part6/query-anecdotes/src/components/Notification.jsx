import { useContext } from "react"
import NotificationContext from "../notificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notification, dispatch] = useContext(NotificationContext)
  console.log(notification)
  
  // const content = notification.notification
  if (notification === undefined || notification === null || notification === '') return null
  // console.log(content)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
