import React from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import ContactList from "./ContactList";

const Sidebar = ({ contacts, activeContact, setActiveContact }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 bg-[#248f6a]  flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://picsum.photos/id/1023/200"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-white font-bold text-[20px]">Chats</h1>
        </div>
        <div className="flex space-x-4">
          <FaSearch className="text-white text-xl" />
          <FaEllipsisV className="text-white text-xl" />
        </div>
      </div>
      <div className="p-2 bg-white">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full p-2 bg-[#f0f2f5] rounded-lg"
        />
      </div>
      <ContactList
        contacts={contacts}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
      />
    </div>
  );
};

export default Sidebar;
