import antNotification from "antd/es/notification";

function notification(message) {
  return {
    success() {
      antNotification.success({
        message: "Success!",
        description: message,
        duration: 2,
      });
    },
    error() {
      antNotification.error({
        message: "Error!",
        description: message,
        duration: 0,
      });
    },
  };
}

export default notification;
