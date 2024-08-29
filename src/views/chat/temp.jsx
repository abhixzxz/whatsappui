// Part 1

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaEllipsisV, FaArrowLeft, FaPaperclip, FaSmile, FaMicrophone } from 'react-icons/fa';
import { FiSend, FiAlertCircle, FiRefreshCw, FiWifi, FiWifiOff } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import imageBg from '../../assets/chatbg.jpg';
import WhatsappImageStarting from '../../assets/entry-image-light__1_-removebg-preview.png';

const WhatsAppWeb = () => {
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    checkWhatsAppStatus();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (whatsappStatus === 'disconnected') {
      navigate('/');
    }
  }, [whatsappStatus, navigate]);

  const checkWhatsAppStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8003/api/whatsapp/status', {
        headers: {
          'X-Username': username,
          'X-Password': localStorage.getItem('password'),
          'X-Token': localStorage.getItem('token'),
        },
      });
      setWhatsappStatus(response.data.status);
    } catch (error) {
      console.error('Error checking WhatsApp status:', error);
      setError('Failed to check WhatsApp status');
    }
  };

  const handleDisconnect = async () => {
    try {
      await axios.post(
        'http://localhost:8003/api/whatsapp/disconnect',
        {},
        {
          headers: {
            'X-Username': username,
            'X-Password': localStorage.getItem('password'),
            'X-Token': localStorage.getItem('token'),
          },
        }
      );
      setWhatsappStatus('disconnected');
      localStorage.removeItem('whatsappConnected');
      navigate('/');
    } catch (error) {
      console.error('Error disconnecting WhatsApp:', error);
      setError('Failed to disconnect WhatsApp');
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() || file || audioBlob) {
      let messageType = 'text';
      let content = inputMessage;
      let fileToSend = file;

      if (file) {
        messageType = file.type.startsWith('image/') ? 'image' :
                      file.type.startsWith('video/') ? 'video' :
                      'document';
      } else if (audioBlob) {
        messageType = 'audio';
        fileToSend = audioBlob;
        content = 'Audio message';
      }

      const formData = new FormData();
      formData.append('messageType', messageType);
      formData.append('content', content);
      if (fileToSend) {
        formData.append('file', fileToSend);
      }

      try {
        const response = await axios.post(
          'http://localhost:8003/api/whatsapp/send-to-all',
          formData,
          {
            headers: {
              'X-Username': username,
              'X-Password': localStorage.getItem('password'),
              'X-Token': localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const newMessage = {
          id: Date.now(),
          content: content,
          sender: 'me',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          type: messageType,
          file: fileToSend,
        };
        setMessages([...messages, newMessage]);
        setInputMessage('');
        setFile(null);
        setAudioBlob(null);
        console.log('Message sent:', response.data);
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message');
      }
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setInputMessage(prevInput => prevInput + emojiObject.emoji);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          setAudioBlob(audioBlob);
        });

        mediaRecorder.start();
        setIsRecording(true);

        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 5000);  // Stop recording after 5 seconds
      });
  };

  const companyClient = {
    id: 1,
    name: 'XYZ User',
    avatar: 'https://picsum.photos/id/1023/200',
    lastMessage: 'Hello! How can I help you?',
    lastMessageTime: '10:10 PM',
    unreadCount: 0,
  };

  return (
    <div className="flex flex-col h-screen bg-[#e5ebf3]">
      <AppBar
        whatsappStatus={whatsappStatus}
        onCheckStatus={checkWhatsAppStatus}
        onDisconnect={handleDisconnect}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          companyClient={companyClient}
          activeContact={activeContact}
          setActiveContact={setActiveContact}
          isMobileView={isMobileView}
        />
        <ChatWindow
          activeContact={activeContact}
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          onBack={() => setActiveContact(null)}
          isMobileView={isMobileView}
          file={file}
          setFile={setFile}
          onFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          handleEmojiClick={handleEmojiClick}
          isRecording={isRecording}
          startRecording={startRecording}
          audioBlob={audioBlob}
        />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  );
};

const AppBar = ({ whatsappStatus, onCheckStatus, onDisconnect }) => {
  return (
    <div className="bg-[#248f6a] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium">WhatsApp Status:</span>
        <span className={`text-lg font-semibold ${whatsappStatus === 'connected' || whatsappStatus === 'session_exists' ? 'text-green-300' : 'text-red-300'}`}>
          {whatsappStatus === 'connected' || whatsappStatus === 'session_exists' ? (
            <FiWifi className="inline mr-1" />
          ) : (
            <FiWifiOff className="inline mr-1" />
          )}
          {whatsappStatus}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onCheckStatus}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center"
        >
          <FiRefreshCw className="mr-2" /> Check Status
        </button>
        {(whatsappStatus === 'connected' || whatsappStatus === 'session_exists') && (
          <button
            onClick={onDisconnect}
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition-colors flex items-center"
          >
            <FiWifiOff className="mr-2" /> Disconnect
          </button>
        )}
      </div>
    </div>
  );
};
const Sidebar = ({ companyClient, activeContact, setActiveContact, isMobileView }) => {
  return (
    <div className={`${isMobileView && activeContact ? 'hidden' : 'w-full sm:w-[30%]'} h-full flex flex-col bg-white`}>
      <div className="p-4 bg-[#248f6a] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={companyClient.avatar}
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
      <ContactItem
        contact={companyClient}
        isActive={companyClient.id === activeContact?.id}
        onClick={() => setActiveContact(companyClient)}
      />
    </div>
  );
};

const ContactItem = ({ contact, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer border-b border-gray-200 ${
        isActive ? 'bg-[#f0f2f5]' : ''
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
          <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-[#667781] truncate">{contact.lastMessage}</p>
          {contact.unreadCount > 0 && (
            <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs ml-2">
              {contact.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({
  activeContact,
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  onBack,
  isMobileView,
  file,
  setFile,
  onFileChange,
  fileInputRef,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
  isRecording,
  startRecording,
  audioBlob,
}) => {
  if (!activeContact) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
        <img
          src={WhatsappImageStarting}
          className="h-[50%] w-[50%]"
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
    <div className="flex-1 flex flex-col h-full">
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
          className="w-10 h-10 rounded-full mr-3"
        />
        <h2 className="text-xl font-semibold flex-1">{activeContact.name}</h2>
        <FaEllipsisV className="text-[#54656f] text-xl" />
      </div>
      <MessageList messages={messages} />
      <InputArea
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={onSendMessage}
        file={file}
        setFile={setFile}
        onFileChange={onFileChange}
        fileInputRef={fileInputRef}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        handleEmojiClick={handleEmojiClick}
        isRecording={isRecording}
        startRecording={startRecording}
        audioBlob={audioBlob}
      />
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      style={{
        backgroundImage: `url(${imageBg})`,
        backgroundSize: 'cover',
        opacity: '0.5',
      }}
    >
      <div className="flex justify-center mb-4">
        <span className="bg-yellow-100 text-center px-4 py-2 rounded flex items-center gap-2 text-[13px]">
          Messages are end-to-end encrypted. No one outside of this chat, not
          even WhatsApp, can read or listen to them. Click to learn more.
        </span>
      </div>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

const MessageItem = ({ message }) => {
  const isMe = message.sender === 'me';

  const renderStatus = () => {
    switch (message.status) {
      case 'sent':
        return (
          <svg viewBox="0 0 16 15" width="16" height="15" className="text-gray-400">
            <path
              fill="currentColor"
              d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        );
      // ... (other cases remain the same)
    }
  };

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <p className="text-black mr-2">{message.content}</p>;
      case 'image':
        return (
          <div>
            <img src={URL.createObjectURL(message.file)} alt="Sent image" className="max-w-xs rounded-lg" />
            {message.content && <p className="text-black mt-2">{message.content}</p>}
          </div>
        );
      case 'video':
        return (
          <div>
            <video src={URL.createObjectURL(message.file)} controls className="max-w-xs rounded-lg" />
            {message.content && <p className="text-black mt-2">{message.content}</p>}
          </div>
        );
      case 'document':
        return (
          <div>
            <p className="text-black">Document: {message.file.name}</p>
            {message.content && <p className="text-black mt-2">{message.content}</p>}
          </div>
        );
      default:
        return <p className="text-black mr-2">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`relative ${
          isMe ? 'bg-[#d1f6b5]' : 'bg-[#fff]'
        } rounded-lg p-2 max-w-sm`}
      >
        <div className="flex items-end">
          {renderContent()}
          <div className="text-xs text-gray-500 flex items-center gap-1 self-end whitespace-nowrap">
            {message.timestamp}
            {renderStatus()}
          </div>
        </div>
        <div
          className={`absolute top-0 w-0 h-0 
          ${
            isMe
              ? 'right-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#d5facd]'
              : 'left-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-[#fff]'
          }`}
        ></div>
      </div>
    </div>
  );
};

const InputArea = ({ inputMessage, setInputMessage, onSendMessage, file, setFile, onFileChange, fileInputRef }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f0f2f5] p-4">
      <div className="flex items-center bg-white rounded-lg px-4 py-1">
        <FaSmile className="text-[#54656f] text-xl mr-2 cursor-pointer" />
        <label htmlFor="file-input" className="cursor-pointer">
          <FaPaperclip className="text-[#54656f] text-xl mr-2" />
        </label>
        <input
          id="file-input"
          type="file"
          onChange={onFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 outline-none py-4"
        />
        {file && (
          <span className="text-sm text-gray-500 mr-2">
            {file.name}
            <button
              onClick={() => setFile(null)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </span>
        )}
        {inputMessage || file ? (
          <button
            type="submit"
            className="bg-[#00a884] text-white rounded-full p-2 ml-2"
          >
            <FiSend />
          </button>
        ) : (
          <FaMicrophone className="text-[#54656f] text-xl ml-2 cursor-pointer" />
        )}
      </div>
    </form>
  );
};

export default WhatsAppWeb;