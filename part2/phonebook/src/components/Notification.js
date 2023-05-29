const Notification = ({ message, notifStyle }) => {
    if (message === null) {
      return null
    }
 
    return (
      <div style={notifStyle} className='error'>
        {message}
      </div>
    )
  }

export default Notification
