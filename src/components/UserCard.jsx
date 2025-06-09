import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { clearFeedById } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleInterestedOrReject = async (status) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(clearFeedById(user._id)); // Clear the user from the feed in Redux store
      console.log("Interest or rejection response:", response.data);
    } catch (error) {
      console.error("Error handling interest or rejection:", error);
    }
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img
          src={user.imageUrl}
          className="w-50 h-50 object-contain rounded-t-lg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <h2>
          I'm {user.age} years old, {user.gender}
        </h2>
        <p>{user.aboutUs}</p>
        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-secondary"
            onClick={() => handleInterestedOrReject("ignored")}
          >
            Ignore
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleInterestedOrReject("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
