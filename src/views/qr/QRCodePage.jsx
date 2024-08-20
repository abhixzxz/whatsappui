import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QRCodePage = () => {
  const { password, token, username } = useParams(); // Extract parameters from the URL
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const validateLink = async () => {
      try {
        // Make the request to the backend with the parameters as headers
        const response = await axios.get(`/api/protected`, {
          headers: {
            "x-password": password,
            "x-token": token,
            "x-username": username, // Include username if needed
          },
        });

        // Check if the parameters match the response data
        const { link, user } = response.data;
        const [expectedUsername, expectedPassword, expectedToken] = link
          .split("/")
          .slice(-3);

        if (
          user.username === expectedUsername &&
          password === expectedPassword &&
          token === expectedToken
        ) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error validating the link:", error);
        setAuthenticated(false);
      }
    };

    validateLink();
  }, [password, token, username]);

  return <div>jjj</div>;
};

export default QRCodePage;
