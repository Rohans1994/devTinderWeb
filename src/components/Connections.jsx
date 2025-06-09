import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const getConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setConnections(response.data.data);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto py-6">
        <p className="text-lg font-semibold">No Connections Made Till Now</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mx-auto py-6">
      <p className="text-lg font-semibold">My Connections</p>
      {connections.map((user) => (
        <ConnectionCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Connections;
