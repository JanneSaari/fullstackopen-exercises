const Notification = ({ message, isError = false }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderSadius: 5,
    padding: 10,
    marginBottom: 10,
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

  if (message === null || message === "") {
    return null;
  } else {
    return (
      <div
        style={isError ? errorStyle : notificationStyle}
        className="notification"
      >
        {message}
      </div>
    );
  }
};

export default Notification;
