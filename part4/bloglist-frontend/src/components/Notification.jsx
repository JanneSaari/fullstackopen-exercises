import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderSadius: 5,
    padding: 10,
    marginBottom: 10,
    visibility: notification ? 'visible' : 'hidden'
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderSadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  console.log('notification: ', notification)

  return (
    <div
      style={notificationStyle}
      className="notification"
    >
      {notification}
    </div>
  );
};

export default Notification;
