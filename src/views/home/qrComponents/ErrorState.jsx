import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import imageError from "../../../assets/3814327.jpg";
function ErrorState({ error }) {
  return (
    <div className="flex items-center justify-center flex-col">
      <img src={imageError} alt="imageError" className="w-[50%]" />
      <h1 className="text-[20px] font-bold uppercase text-red-500 animate animate-bounce">{error.message}</h1>
    </div>
    // <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-pink-500">
    //   <motion.div
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg"
    //   >
    //     <FiAlertCircle className="text-6xl text-red-500 mb-4" />
    //     <p className="text-xl text-red-700 font-semibold mb-4">
    //       Error fetching data:
    //     </p>
    //     <p className="text-gray-700">{error.message}</p>
    //   </motion.div>
    // </div>
  );
}

export default ErrorState;