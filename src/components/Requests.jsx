import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  // const [requests, setRequests] = useState([]);
  const getRequests = async () => {
    if (!requests) {
      const response = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      console.log(`Received requests:`, response.data.data);
      dispatch(setRequests(response.data.data));
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto py-6">
        <p className="text-lg font-semibold">My Requests</p>
        <p>No connection requests found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto py-6">
      <p className="text-lg font-semibold">My Requests</p>
      {requests.map((user) => (
        <ConnectionCard
          key={user._id}
          user={user.fromUserId}
          request={true}
          id={user._id}
        />
      ))}
    </div>
  );
};

export default Requests;
