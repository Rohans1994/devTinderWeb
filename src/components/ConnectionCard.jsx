import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { clearRequest } from "../utils/requestsSlice";

const ConnectionCard = (params) => {
  const { firstName, lastName, imageUrl, aboutUs } = params.user;
  const requestStatus = params.request || false;
  const requestId = params.id || null;
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const respondToConenctionRequest = async (status) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      setShowToast(true); // Show success toast
      setTimeout(() => {
        setShowToast(false);
        dispatch(clearRequest(requestId)); // Clear the request from Redux store
      }, 3000); // Hide toast after 3 seconds
    } catch (error) {
      console.error("Error responding to connection request:", error);
    }
  };
  return (
    <>
      <div className="card card-side bg-purple-100 w-150 shadow-sm my-5">
        <figure>
          <img
            className="mx-4 w-24 h-24 rounded-full"
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title">{firstName}</h2>
          <p>{aboutUs}</p>
          {requestStatus && (
            <div className="">
              <button
                className="w-20 btn btn-secondary"
                onClick={() => respondToConenctionRequest("rejected")}
              >
                Reject
              </button>
              <button
                className="mx-5 w-20 btn btn-success"
                onClick={() => respondToConenctionRequest("accepted")}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div className="alert alert-success">
            <span>Connection Accepted successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectionCard;
