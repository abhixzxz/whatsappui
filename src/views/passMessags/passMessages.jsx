import axios from "axios";

const SendButton = () => {
  const handleClick = async () => {
    try {
      const notifications = [
        {
          mobileno: "1234567890",
          sendtime: new Date(),
          status: "pending",
          name: "John Doe",
          outgoingstatus: "pending",
          type: "male_gym",
          message: "Welcome!",
          priority: "marketing",
        },
        // Add more notifications as needed
      ];

      const response = await axios.post(
        "http://localhost:8003/api/notifications/send",
        { notifications }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Error sending messages");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
    >
      Send Messages
    </button>
  );
};

export default SendButton;
