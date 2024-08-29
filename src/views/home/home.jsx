import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainContent from "./qrComponents/MainContent";
import ErrorState from "./qrComponents/ErrorState";
import LoadingState from "./qrComponents/LoadingState";
import { BASE_URL, MainRoutes } from "../../utils/constants/constants";

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
    const wasConnected = localStorage.getItem('whatsappConnected') === 'true';
    if (wasConnected) {
      checkWhatsAppStatus();
    } else {
      fetchData();
    }
  }, [navigate]);

  const checkWhatsAppStatus = async () => {
    try {
      const statusResponse = await axios.get(
        `${BASE_URL}${MainRoutes.checkWhatsAppStatus}`,
        {
          headers: {
            "X-Username": localStorage.getItem('username'),
            "X-Password": localStorage.getItem('password'),
            "X-Token": localStorage.getItem('token'),
          },
        }
      );
      if (statusResponse.data.status === "connected" || statusResponse.data.status === "session_exists") {
        navigate('/dashboard');
      } else {
        localStorage.removeItem('whatsappConnected');
        fetchData();
      }
    } catch (error) {
      localStorage.removeItem('whatsappConnected');
      fetchData();
    }
  };

  const fetchData = async () => {
    const testUrl = "https://wa.amiyon.com/whatsapp?username=testpaynet&password=password&token=bb02ae95a938c9c305e855e65d568f7120378ffe";
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

    try {
      const companyResponse = await axios.get(
        `${BASE_URL}${MainRoutes.getCompanyInfo}/${username}`,
        {
          headers: {
            "X-Username": username,
            "X-Password": password,
            "X-Token": token,
          },
        }
      );
      setCompanyId(companyResponse.data.id);

      const statusResponse = await axios.get(
        `${BASE_URL}${MainRoutes.checkWhatsAppStatus}`,
        {
          headers: {
            "X-Username": username,
            "X-Password": password,
            "X-Token": token,
          },
        }
      );

      setStatus(statusResponse.data.status);
      if (statusResponse.data.status === "connected" || statusResponse.data.status === "session_exists") {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('token', token);
        localStorage.setItem('whatsappConnected', 'true');
        navigate('/dashboard');
        return;
      }

      if (statusResponse.data.status === "qr_ready") {
        setQRCode(statusResponse.data.qrImageUrl);
      } else if (statusResponse.data.status === "disconnected") {
        const qrResponse = await axios.get(
          `${BASE_URL}${MainRoutes.getWhatsAppQR}`,
          {
            headers: {
              "X-Username": username,
              "X-Password": password,
              "X-Token": token,
            },
          }
        );
        if (qrResponse.data.qrImageUrl) {
          setQRCode(qrResponse.data.qrImageUrl);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const statusResponse = await axios.get(
          `${BASE_URL}${MainRoutes.checkWhatsAppStatus}`,
          {
            headers: {
              "X-Username": credentials.username,
              "X-Password": credentials.password,
              "X-Token": credentials.token,
            },
          }
        );
        if (statusResponse.data.status === "connected" || statusResponse.data.status === "session_exists") {
          localStorage.setItem('username', credentials.username);
          localStorage.setItem('password', credentials.password);
          localStorage.setItem('token', credentials.token);
          localStorage.setItem('whatsappConnected', 'true');
          navigate('/dashboard');
        }
      } catch (error) {

      }
    };

    const intervalId = setInterval(checkAuthStatus, 5000);

    return () => clearInterval(intervalId);
  }, [credentials, navigate]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return <MainContent status={status} qrCode={qrCode} />;
}

export default HomePage;