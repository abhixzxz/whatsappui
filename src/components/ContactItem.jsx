import React from "react";
import { motion } from "framer-motion";

const ContactItem = ({ contact, isActive, onClick }) => {
  const renderLastMessageStatus = () => {
    switch (contact.lastMessageStatus) {
      case "sent":
        return (
          <svg
            viewBox="0 0 16 15"
            width="16"
            height="15"
            className="text-gray-400"
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
            className="text-gray-400"
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
      whileHover={{ backgroundColor: "#f0f2f5" }}
      className={`flex items-center p-3 cursor-pointer border-b border-gray-200 ${
        isActive ? "bg-[#f0f2f5]" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={contact.avatar}
        alt={contact.name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[#111b21]">{contact.name}</h3>
          <span className="text-xs text-gray-500">
            {contact.lastMessageTime} 10.10 PM
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center flex-1 min-w-0">
            {renderLastMessageStatus()}
            <p className="text-sm text-[#667781] ml-1 truncate">
              {contact.lastMessage}
            </p>
          </div>
          {contact.unreadCount > 0 && (
            <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs ml-2">
              {contact.unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactItem;
