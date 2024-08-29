import React from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { FaWhatsappSquare } from "react-icons/fa";


function LoadingState() {
  return (
    <div className="flex items-center justify-center h-screen bg-green">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <FaWhatsappSquare className="animate-spin text-6xl text-green-400 mb-4" />
        <p className="text-2xl font-semibold text-black uppercase">Loading...</p>
      </motion.div>
    </div>
  );
}

export default LoadingState;