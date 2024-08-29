import React from "react";
import ContactItem from "./ContactItem";

const ContactList = ({ contacts, activeContact, setActiveContact }) => {
  return (
    <div className="overflow-y-auto flex-1">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          isActive={contact.id === activeContact?.id}
          onClick={() => setActiveContact(contact)}
        />
      ))}
    </div>
  );
};

export default ContactList;
