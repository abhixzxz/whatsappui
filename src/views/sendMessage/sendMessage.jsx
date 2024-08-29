import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSend, FiAlertCircle, FiRefreshCw, FiWifi, FiWifiOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function SendMessage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('text');
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected');
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const fileInputRef = useRef(null);

  useEffect(() => {
    checkWhatsAppStatus();
  }, []);

  useEffect(() => {
    console.log('WhatsApp status changed:', whatsappStatus);
    if (whatsappStatus === 'disconnected') {
      navigate('/');
    }
  }, [whatsappStatus, navigate]);

  const checkWhatsAppStatus = async () => {
    try {
      console.log('Checking WhatsApp status...');
      const response = await axios.get('http://localhost:8003/api/whatsapp/status', {
        headers: {
          'X-Username': username,
          'X-Password': localStorage.getItem('password'),
          'X-Token': localStorage.getItem('token'),
        },
      });
      console.log('WhatsApp status response:', response.data);
      setWhatsappStatus(response.data.status);
    } catch (error) {
      console.error('Error checking WhatsApp status:', error);
      setError('Failed to check WhatsApp status');
    }
  };

  const handleDisconnect = async () => {
    try {
      const response = await axios.post(
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
      console.log('Disconnect response:', response.data);
      setWhatsappStatus('disconnected');
      localStorage.removeItem('whatsappConnected');
      navigate('/'); // Redirect to home route after disconnecting
    } catch (error) {
      console.error('Error disconnecting WhatsApp:', error);
      setError('Failed to disconnect WhatsApp');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    console.log('Current WhatsApp status:', whatsappStatus);

    if (whatsappStatus !== 'connected' && whatsappStatus !== 'session_exists') {
      console.log('WhatsApp is not connected');
      setError('WhatsApp is not connected. Please connect WhatsApp first.');
      return;
    }

    setSending(true);
    setError(null);
    setSuccess(false);

    console.log('Attempting to send message:', message);

    try {
      console.log('Sending request to backend...');
      const formData = new FormData();
      formData.append('messageType', messageType);
      formData.append('content', message);
      if (file) {
        formData.append('media', file);
      }

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
      console.log('Response from backend:', response.data);
      setSuccess(true);
      setMessage('');
      setFile(null);
      setMessageType('text');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.response?.data?.error || 'An error occurred while sending the message');
    } finally {
      setSending(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Send Message to All Users</h1>

        <div className="mb-6 flex items-center space-x-2">
          <span className="text-lg font-medium">WhatsApp Status:</span>
          <span className={`text-lg font-semibold ml-2 ${whatsappStatus === 'connected' || whatsappStatus === 'session_exists' ? 'text-green-500' : 'text-red-500'}`}>
            {whatsappStatus === 'connected' || whatsappStatus === 'session_exists' ? (
              <FiWifi className="inline mr-1 text-green-500" />
            ) : (
              <FiWifiOff className="inline mr-1 text-red-500" />
            )}
            {whatsappStatus}
          </span>
        </div>

        <div className="mb-6 flex space-x-4">
          <button 
            onClick={checkWhatsAppStatus} 
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            <FiRefreshCw className="mr-2" /> Check Status
          </button>
          {(whatsappStatus === 'connected' || whatsappStatus === 'session_exists') && (
            <button
              onClick={handleDisconnect}
              className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition-colors"
            >
              <FiWifiOff className="mr-2" /> Disconnect
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message:</label>
            <textarea
              id="message"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here"
              required
            />
          </div>

          <div>
            <label htmlFor="messageType" className="block text-gray-700 font-medium mb-1">Message Type:</label>
            <select
              id="messageType"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
          </div>

          {messageType !== 'text' && (
            <div>
              <label htmlFor="media" className="block text-gray-700 font-medium mb-1">Upload File:</label>
              <input
                id="media"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center"
            disabled={sending || (whatsappStatus !== 'connected' && whatsappStatus !== 'session_exists')}
          >
            {sending ? (
              'Sending...'
            ) : (
              <>
                <FiSend className="mr-2" /> Send Message
              </>
            )}
          </button>
        </form>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="mt-4 text-red-600 flex items-center"
          >
            <FiAlertCircle className="mr-2" /> {error}
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="mt-4 text-green-600 flex items-center"
          >
            <FiAlertCircle className="mr-2" /> Message sent successfully!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default SendMessage;