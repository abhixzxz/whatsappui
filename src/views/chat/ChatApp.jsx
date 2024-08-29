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
  const [allMessages, setAllMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [whatsappStatus, setWhatsappStatus] = useState('checking');
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    checkWhatsAppStatus();
    fetchPreviousMessages();
    fetchCompanyName();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCompanyName = async () => {
    try {
      const response = await axios.get(`http://localhost:8003/api/users/company/${username}`, {
        headers: {
          'X-Username': username,
          'X-Password': localStorage.getItem('password'),
          'X-Token': localStorage.getItem('token'),
        },
      });
      setCompanyName(response.data.name);
    } catch (error) {
      console.error('Error fetching company name:', error);
      setError('Failed to fetch company name');
    }
  };

  const fetchPreviousMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8003/api/whatsapp/previous-messages`, {
        headers: {
          'X-Username': username,
          'X-Password': localStorage.getItem('password'),
          'X-Token': localStorage.getItem('token'),
        },
      });
      setAllMessages(response.data.data);
      if (response.data.data.length > 0) {
        setActiveContact(response.data.data[0].user);
      }
    } catch (error) {
      console.error('Error fetching previous messages:', error);
      setError('Failed to fetch previous messages');
    }
  };

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
      if (response.data.status === 'disconnected') {
        localStorage.removeItem('whatsappConnected');
      } else {
        localStorage.setItem('whatsappConnected', 'true');
      }
    } catch (error) {
      console.error('Error checking WhatsApp status:', error);
      setError('Failed to check WhatsApp status');
      setWhatsappStatus('error');
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
      navigate('/', { replace: true });
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
          mediaType: messageType,
          mediaURL: fileToSend ? URL.createObjectURL(fileToSend) : null,
          timestamp: new Date().toISOString(),
          status: 'sent',
        };

        setAllMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const activeContactIndex = updatedMessages.findIndex(m => m.user.id === activeContact.id);
          if (activeContactIndex !== -1) {
            updatedMessages[activeContactIndex] = {
              ...updatedMessages[activeContactIndex],
              messages: [...updatedMessages[activeContactIndex].messages, newMessage],
            };
          } else {
            updatedMessages.push({
              user: activeContact,
              messages: [newMessage],
            });
          }
          return updatedMessages;
        });

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

  const handleEmojiClick = (emojiData, event) => {
    setInputMessage(prevInput => prevInput + emojiData.emoji);
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
        }, 5000);
      });
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
        contacts={allMessages}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        isMobileView={isMobileView}
        companyName={companyName}
      />
      <ChatWindow
        activeContact={activeContact}
        messages={activeContact ? allMessages.find(m => m.user.id === activeContact.id)?.messages || [] : []}
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
        companyName={companyName}
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
    <div className="bg-[#248f6a] text-white p-4  flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium "> Connection Status:</span>
        <span className={`text-lg flex items-center gap-2 font-semibold uppercase ${whatsappStatus === 'connected' || whatsappStatus === 'session_exists' ? 'text-green-300' : 'text-red-300'}`}>
          {whatsappStatus === 'connected' || whatsappStatus === 'session_exists' ? (
            <FiWifi className="inline mr-1 text-[24px]" />
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
const Sidebar = ({ contacts, activeContact, setActiveContact, isMobileView, companyName }) => {
  return (
    <div className={`${isMobileView && activeContact ? 'hidden' : 'block'} w-full sm:w-[30%] h-full flex flex-col bg-white`}>
      <div className="p-4 bg-[#248f6a] flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://picsum.photos/id/1023/200"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-white font-bold text-[20px]">Chats</h1>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-white text-sm">{companyName}</span>
          <div className="flex space-x-4">
            <FaSearch className="text-white text-xl" />
            <FaEllipsisV className="text-white text-xl" />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        <ContactItem
          companyName={companyName}
          isActive={true}
          onClick={() => setActiveContact(companyName)}
        />
      </div>
    </div>
  );
};
const ContactItem = ({ companyName, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer border-b border-gray-200 ${isActive ? 'bg-[#f0f2f5]' : ''}`}
      onClick={onClick}
    >
      <img
        src={`https://picsum.photos/seed/${companyName}/200`}
        alt={companyName}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-[#111b21]">{companyName}</h3>
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
  companyName,
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
        <p className="text-[#41525d] text-lg mt-2">
          Company: {companyName}
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
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{activeContact.name}</h2>
          <p className="text-sm text-gray-500">{companyName}</p>
        </div>
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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div ref={messagesEndRef} />
    </div>
  );
};

const MessageItem = ({ message }) => {
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
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (message.mediaType) {
      case 'none':
      case 'text':
        return <p className="text-black mr-2 break-words">{message.content}</p>;
      case 'image':
        return (
          <div>
            <img src={message.mediaURL} alt="Sent image" className="max-w-full h-auto rounded-lg" />
            {message.content && <p className="text-black mt-2 break-words">{message.content}</p>}
          </div>
        );
      case 'video':
        return (
          <div>
            <video src={message.mediaURL} controls className="max-w-full h-auto rounded-lg" />
            {message.content && <p className="text-black mt-2 break-words">{message.content}</p>}
          </div>
        );
      case 'document':
        return (
          <div>
            <p className="text-black break-words">Document: {message.content}</p>
            <a href={message.mediaURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Document</a>
          </div>
        );
      default:
        return <p className="text-black mr-2 break-words">{message.content}</p>;
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <div className="relative bg-[#d1f6b5] rounded-lg p-2 max-w-[75%] break-words">
        <div className="flex flex-col items-end">
          {renderContent()}
          <div className="text-xs text-gray-500 flex items-center gap-1 self-end whitespace-nowrap mt-1">
            {new Date(message.timestamp).toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
            {renderStatus()}
          </div>
        </div>
        <div className="absolute top-0 w-0 h-0 right-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#d5facd]"></div>
      </div>
    </div>
  );
};

const InputArea = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  file,
  setFile,
  onFileChange,
  fileInputRef,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
  isRecording,
  startRecording,
  audioBlob
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f0f2f5] p-4">
      <div className="flex items-center bg-white rounded-lg px-4 py-1">
        <div className="relative">
          <FaSmile
            className="text-[#54656f] text-xl mr-2 cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-10 left-0 z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
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
        {inputMessage || file || audioBlob ? (
          <button
            type="submit"
            className="bg-[#00a884] text-white rounded-full p-2 ml-2"
          >
            <FiSend />
          </button>
        ) : (
          <FaMicrophone
            className={`text-[#54656f] text-xl ml-2 cursor-pointer ${isRecording ? 'text-red-500' : ''}`}
            onClick={startRecording}
          />
        )}
      </div>
    </form>
  );
};

export default WhatsAppWeb;