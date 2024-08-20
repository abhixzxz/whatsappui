import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner, FaUnlink } from "react-icons/fa";
import Swal from "sweetalert2";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScanQrImage from "../../../src/assets/4149572.jpg";
import DoneLinked from "../../../src/assets/linked.jpg";
import { FaHome } from "react-icons/fa";

const QRCodeFetcher = () => {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientConnected, setClientConnected] = useState(false);
  const [clientInitializing, setClientInitializing] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      if (!selectedProject) return;

      setLoading(true);

      try {
        const qrResponse = await axios.get(`http://localhost:8003/qr`);
        const clientStatusResponse = await axios.get(
          `http://localhost:8003/client-status`
        );

        setClientInitializing(false);

        if (clientStatusResponse.data.initialized) {
          setClientConnected(true);
          setQrCode("");
          setError(null);
          navigate("/homepage");
        } else if (qrResponse.data.qrCode) {
          setQrCode(qrResponse.data.qrCode);
          setError(null);
        } else {
          setClientConnected(false);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        setError(error.response?.data?.error || "Error fetching status");
        setClientConnected(false);
        setClientInitializing(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 30000);

    return () => clearInterval(intervalId);
  }, [selectedProject, navigate]); // Add navigate to dependency array

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
    setQrCode(""); // Clear QR code when the project changes
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300 p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-900 uppercase"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {clientConnected
          ? "You are ready to go!"
          : "Select Project & Scan QR Code"}
      </motion.h1>
      <div className="w-[300px]">
        <FormControl fullWidth variant="outlined" className="mb-6 text-white">
          <InputLabel>Select Project</InputLabel>
          <Select
            value={selectedProject}
            onChange={handleProjectChange}
            label="Select Project"
          >
            <MenuItem value="fk_fitness">FK Fitness</MenuItem>
            <MenuItem value="go_paynet">Go Paynet</MenuItem>
            <MenuItem value="i_connect_billing">I Connect Billing</MenuItem>
            <MenuItem value="mada_eats">Mada Eats</MenuItem>
          </Select>
        </FormControl>
      </div>

      {clientInitializing && !clientConnected && (
        <motion.div
          className="flex items-center space-x-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <p className="text-gray-800">Initializing WhatsApp Client...</p>
        </motion.div>
      )}

      {loading && !clientInitializing && !clientConnected && (
        <motion.div
          className="flex items-center space-x-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <p className="text-gray-800">Fetching QR Code...</p>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="flex items-center space-x-2 text-red-500 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>{error}</p>
        </motion.div>
      )}

      {!clientConnected && !qrCode && (
        <motion.img
          src={ScanQrImage}
          alt="Scan QR Code"
          className="w-64 h-64 border-4 border-gray-300 mt-20 rounded-lg shadow-lg mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {!clientConnected && qrCode && (
        <motion.img
          src={qrCode}
          alt="QR Code"
          className="w-64 h-64 border-4 border-gray-300 mt-20 rounded-lg shadow-lg mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {clientConnected && (
        <>
          <motion.img
            src={DoneLinked}
            alt="Client Linked"
            className="w-64 h-64 border-4 border-gray-300 mt-10 rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="flex items-center gap-2">
            {/* <motion.button
              onClick={unlinkClient}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <FaUnlink />
              <span>Unlink</span>
            </motion.button> */}
            <motion.button
              // onClick={() => navigate("/homepage")}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <FaHome />
              <span>Home</span>
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default QRCodeFetcher;
