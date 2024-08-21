import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const InputArea = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f0f2f5] p-4">
      <div className="flex items-center bg-white rounded-lg px-4 py-1">
        <FaSmile className="text-[#54656f] text-xl mr-2 cursor-pointer" />
        <FaPaperclip className="text-[#54656f] text-xl mr-2 cursor-pointer" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 outline-none py-4"
        />
        {message ? (
          <button
            type="submit"
            className="bg-[#00a884] text-white rounded-full p-2 ml-2"
          >
            <IoMdSend />
          </button>
        ) : (
          <FaMicrophone className="text-[#54656f] text-xl ml-2 cursor-pointer" />
        )}
      </div>
    </form>
  );
};

export default InputArea;
