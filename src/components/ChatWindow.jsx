import React from "react";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import WhatsappImageStarting from "../assets/entry-image-light__1_-removebg-preview.png";

const ChatWindow = ({
  activeContact,
  messages,
  onSendMessage,
  onBack,
  isMobileView,
  onProfileClick,
}) => {
  if (!activeContact) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img
          src={WhatsappImageStarting}
          className="[h-50%] w-[50%]"
          alt="WhatsappImageStarting"
        />
        <h1 className="text-[50px]">Whatsapp Web</h1>
        <p className="text-[#41525d] text-lg">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] flex items-center">
        {isMobileView && (
          <FaArrowLeft
            className="text-[#54656f] text-xl mr-4 cursor-pointer"
            onClick={onBack}
          />
        )}
        <img
          src={activeContact.avatar}
          alt={activeContact.name}
          className="w-10 h-10 rounded-full mr-3 cursor-pointer"
          onClick={onProfileClick}
        />
        <h2
          className="text-xl font-semibold flex-1 cursor-pointer"
          onClick={onProfileClick}
        >
          {activeContact.name}
        </h2>
        <FaEllipsisV className="text-[#54656f] text-xl" />
      </div>
      <MessageList messages={messages} />
      <InputArea onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
