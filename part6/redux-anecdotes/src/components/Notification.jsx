import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log(notifications)

  const closeNotification = (event) => {
    event.preventDefault()
    const content = event.target.parentElement.id
    console.log(content)
    dispatch(removeNotification(content))
  }

  return (
    <div>
      {notifications.map(notification =>
        <div id={notification.id} key={notification.id} style={style}>
          {notification.content}
          <button onClick={closeNotification}>Close</button>
        </div>
      )}
    </div>
  )
}

export default Notification