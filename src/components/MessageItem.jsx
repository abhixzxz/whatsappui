import React from "react";
import { motion } from "framer-motion";

const MessageItem = ({ message }) => {
  const isMe = message.sender === "me";

  const renderStatus = () => {
    if (message.sender === "them") return null;

    switch (message.status) {
      case "sent":
        return (
          <svg
            viewBox="0 0 16 15"
            width="16"
            height="15"
            className="text-black"
          >
            <path
              fill="currentColor"
              d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        );
      case "delivered":
        return (
          <svg
            viewBox="0 0 16 15"
            width="16"
            height="15"
            className="text-black"
          >
            <path
              fill="currentColor"
              d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        );
      case "read":
        return (
          <svg
            viewBox="0 0 16 15"
            width="16"
            height="15"
            className="text-blue-500"
          >
            <path
              fill="currentColor"
              d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`relative ${
          isMe ? "bg-[#d1f6b5]" : "bg-[#fff]"
        } rounded-lg p-2 max-w-sm`}
      >
        <div className="flex items-end">
          <p className="text-black mr-2">{message.content}</p>
          <div className="text-xs text-black flex items-center gap-1 self-end whitespace-nowrap">
            {message.timestamp}
            {renderStatus()}
          </div>
        </div>
        <div
          className={`absolute top-0 w-0 h-0 
          ${
            isMe
              ? "right-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#d5facd]"
              : "left-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-[#fff]"
          }`}
        ></div>
      </div>
    </motion.div>
  );
};

export default MessageItem;
