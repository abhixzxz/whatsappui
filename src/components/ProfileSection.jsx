import React from "react";
import {
  FaTimes,
  FaPhone,
  FaVideo,
  FaInfoCircle,
  FaImage,
  FaLink,
  FaFile,
  FaBan,
  FaFlag,
  FaTrash,
} from "react-icons/fa";

const ProfileSection = ({ name, image, onClose }) => {
  const bio = "Hello, I'm using WhatsApp!"; // Example bio

  const InfoItem = ({ icon, text, onClick }) => (
    <div
      className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="ml-4">{text}</span>
    </div>
  );

  return (
    <div className="h-full bg-[#f0f2f5] overflow-y-auto">
      <div className="sticky top-0 bg-[#008069] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contact Info</h2>
        <FaTimes
          className="text-white text-xl cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="bg-white mb-3">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        <h3 className="text-2xl font-semibold p-4">{name}</h3>
        <p className="px-4 pb-4 text-gray-600">{bio}</p>
      </div>
      <div className="bg-white mb-3">
        <InfoItem
          icon={<FaPhone className="text-[#008069]" />}
          text="Audio call"
        />
        <InfoItem
          icon={<FaVideo className="text-[#008069]" />}
          text="Video call"
        />
      </div>
      <div className="bg-white mb-3">
        <InfoItem
          icon={<FaInfoCircle className="text-[#008069]" />}
          text="About and phone number"
        />
        <InfoItem
          icon={<FaImage className="text-[#008069]" />}
          text="Media, links and docs"
        />
      </div>
      <div className="bg-white mb-3">
        <InfoItem
          icon={<FaBan className="text-red-500" />}
          text="Block"
          onClick={() => alert("Block functionality to be implemented")}
        />
        <InfoItem
          icon={<FaFlag className="text-red-500" />}
          text="Report contact"
          onClick={() => alert("Report functionality to be implemented")}
        />
        <InfoItem
          icon={<FaTrash className="text-red-500" />}
          text="Delete chat"
          onClick={() => alert("Delete chat functionality to be implemented")}
        />
      </div>
    </div>
  );
};

export default ProfileSection;
