import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiRefreshCw } from "react-icons/fi";
import imgQr from "../../../assets/4149572.jpg";

function MainContent({ status, qrCode }) {
  return (
    <div className="flex flex-col min-h-screen bg-green-200">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-1/3 sm:h-1/2 bg-green-200"
      />
      <div className="flex flex-col items-center justify-center bg-[#63dd83] p-4 sm:p-6">
        <img
          src={imgQr}
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }}
          alt="img"
          className="h-32 w-32 sm:h-40 sm:w-40 rounded-t-[30px] sm:rounded-t-[40px] mt-3 sm:mt-5"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }}
          className="bg-[#ccfacc] shadow-lg rounded-[20px] p-6 sm:p-8 w-full max-w-xs sm:max-w-md"
        >
          <h1 className="text-[14px] lg:text-[20px] font-bold text-gray-800 mb-4 sm:mb-6 uppercase flex gap-2">
            Welcome to <div className="text-green-500">WhatsApp</div> Connect
          </h1>
          {status !== "connected" && status !== "session_exists" && qrCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <h2 className="text-[14px] sm:text-[16px] font-semibold text-gray-700 mb-4">
                <FiCheckCircle className="inline-block text-green-500 mr-2" />
                Scan this QR code to authenticate WhatsApp:
              </h2>
              <div 
               style={{
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
              }}
              className="inline-block p-3 sm:p-4 bg-white rounded-lg shadow-md">
                <img src={qrCode} alt="WhatsApp QR Code" className="w-full" />
              </div>
            </motion.div>
          )}
          {status === "disconnected" && !qrCode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <p className="text-red-500 mb-4">
                <FiXCircle className="inline-block text-red-500 mr-2" />
                WhatsApp is disconnected.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FiRefreshCw className="mr-2" />
                Refresh for new QR code
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MainContent;