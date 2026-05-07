const Notification = ({ notificationText }) => {
  if (notificationText === null) {
    return null;
  }
  return <p className="notification"> {notificationText} </p>;
};

export default Notification;
