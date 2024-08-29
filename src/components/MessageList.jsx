import React from "react";
import imageBg from "../assets/chatbg.jpg";
import MessageItem from "./MessageItem";
import { IoLockClosed } from "react-icons/io5";

const MessageList = ({ messages }) => {
  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      style={{
        backgroundImage: `url(${imageBg})`,
        backgroundSize: "cover",
        opacity: "0.5",
      }}
    >
      <div className="flex justify-center mb-4">
        <span className="bg-yellow-100 text-center px-4 py-2 rounded flex items-center gap-2 text-[13px]">
          <IoLockClosed />
          Messages are end-to-end encrypted. No one outside of this chat, not
          even WhatsApp, can read or listen to them. Click to learn more.
        </span>
      </div>
      {messages.map((message) => (
        <MessageItem
          className="text-black"
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};

export default MessageList;
