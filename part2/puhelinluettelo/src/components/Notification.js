const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderSadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if(message === null || message === ""){
        return null
    }
    else{ return(
        <div style={notificationStyle} className="notification">
            {message}
        </div>)
    }
}

export default Notification