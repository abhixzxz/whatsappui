import React, { useState, useEffect } from "react";
import axios from "axios";

function GymMaleQrCode({ username, password, token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8003/api/users/company/${username}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h1>Gym Male QR Code</h1>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <p>Token: {token}</p>
      {data && (
        <div>
          <h1>{data?.id}</h1>
        </div>
      )}
    </div>
  );
}

export default GymMaleQrCode;
