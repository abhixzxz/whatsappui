// src/ChatApp.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  initialContacts,
  initialMessages,
} from "../../dummyData/chatDummyData";
import Sidebar from "../../components/Sidebar";
import ChatWindow from "../../components/ChatWindow";
import ProfileSection from "../../components/ProfileSection";

const ChatApp = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = (content) => {
    if (!activeContact) return;
    const newMessage = {
      id: Date.now(),
      contactId: activeContact.id,
      content,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };
    setMessages([...messages, newMessage]);

    setContacts(
      contacts.map((contact) =>
        contact.id === activeContact.id
          ? { ...contact, lastMessage: content, lastMessageStatus: "sent" }
          : contact
      )
    );

    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === activeContact.id
            ? { ...contact, lastMessageStatus: "delivered" }
            : contact
        )
      );
    }, 2000);

    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === activeContact.id
            ? { ...contact, lastMessageStatus: "read" }
            : contact
        )
      );
    }, 4000);
  };

  const handleSetActiveContact = (contact) => {
    setActiveContact(contact);
    setContacts(
      contacts.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="flex h-screen bg-[#e5ebf3]">
      <motion.div
        initial={{ x: isMobileView ? -300 : 0 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`${
          isMobileView && activeContact ? "hidden" : "w-full sm:w-[30%]"
        } sm:block`}
      >
        <Sidebar
          contacts={contacts}
          activeContact={activeContact}
          setActiveContact={handleSetActiveContact}
        />
      </motion.div>
      {(activeContact || !isMobileView) && (
        <motion.div
          initial={{ x: isMobileView ? 300 : 0 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-1 flex"
        >
          <div className={`flex-1 ${showProfile ? "sm:w-2/3" : "w-full"}`}>
            <ChatWindow
              activeContact={activeContact}
              messages={messages.filter(
                (m) => m.contactId === activeContact?.id
              )}
              onSendMessage={handleSendMessage}
              onBack={() => setActiveContact(null)}
              isMobileView={isMobileView}
              onProfileClick={toggleProfile}
            />
          </div>
          {showProfile && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-1/3 h-full"
            >
              <ProfileSection
                name={activeContact?.name}
                image={activeContact?.avatar}
                onClose={toggleProfile}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ChatApp;
