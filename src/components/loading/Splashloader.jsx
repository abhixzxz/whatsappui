import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 20;
        }
        clearInterval(interval);
        return 100;
      });
    }, 1000);

    if (loadingProgress === 100) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 4000);

      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [loadingProgress, navigate]);

  return (
    <div className="bg-splash-bg min-h-screen flex flex-col justify-center items-center">
      <div className="relative">
        <div className="absolute -left-24 bottom-0 top-0 w-24 bg-splash-gradient animate-glisten"></div>
        <FaWhatsapp className="z-30 text-green-500 w-24 h-24" />
      </div>
      <div className="relative w-52 max-w-xl h-1 mt-5 mb-7 bg-gray-200">
        <div
          style={{ width: `${loadingProgress}%` }}
          className="absolute h-full bg-green-500 transition-width duration-1000 ease-linear"
        />
      </div>
      <h1 className="text-2xl font-medium mb-2 text-green-600 uppercase">
        Whatsapp cloud Amiyon
      </h1>
    </div>
  );
};

export default SplashPage;
