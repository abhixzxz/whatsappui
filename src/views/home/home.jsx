import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    token: "",
  });

  const [companyId, setCompanyId] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const testUrl =
      "https://example.com/test?username=exampleUser&password=examplePassword&token=b0959df10fb127e643aa89fbb33d0d97489fceb1";

    const extractParams = (url) => {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.search);
      return {
        username: params.get("username"),
        password: params.get("password"),
        token: params.get("token"),
      };
    };

    const { username, password, token } = extractParams(testUrl);
    setCredentials({ username, password, token });

    const fetchData = async () => {
      try {
        const companyResponse = await axios.get(
          `http://localhost:8003/api/users/company/${username}`
        );
        setCompanyId(companyResponse.data.id);

        const statusResponse = await axios.get(
          `http://localhost:8003/api/whatsapp/status`,
          {
            headers: {
              "X-Username": username,
              "X-Password": password,
              "X-Token": token,
            },
          }
        );
        setStatus(statusResponse.data.status);

        if (statusResponse.data.status !== "authenticated") {
          const qrResponse = await axios.get(
            `http://localhost:8003/api/whatsapp/qrcode`,
            {
              headers: {
                "X-Username": username,
                "X-Password": password,
                "X-Token": token,
              },
            }
          );
          setQRCode(qrResponse.data.qrCode);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const statusResponse = await axios.get(
          `http://localhost:8003/api/whatsapp/status`,
          {
            headers: {
              "X-Username": credentials.username,
              "X-Password": credentials.password,
              "X-Token": credentials.token,
            },
          }
        );
        if (statusResponse.data.status === "authenticated") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    const intervalId = setInterval(checkAuthStatus, 5000);

    return () => clearInterval(intervalId);
  }, [credentials, navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
        <p className="ml-2 text-xl text-blue-500">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FiAlertCircle className="text-4xl text-red-500" />
        <p className="text-xl text-red-500 mt-2">
          Error fetching data: {error.message}
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Company ID: {companyId}
        </h1>
        {/* <div className="flex items-center">
          <p className="text-lg text-gray-600">WhatsApp Status: {status}</p>
          {status === "authenticated" && (
            <FiCheckCircle className="ml-2 text-green-500 text-2xl" />
          )}
        </div> */}
        {status !== "authenticated" && qrCode && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Scan this QR code to authenticate WhatsApp:
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-4 bg-white rounded-lg shadow-md"
            >
              <QRCode value={qrCode} size={200} />
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default HomePage;
