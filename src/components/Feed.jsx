import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../utils/feedSlice";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      if (feedData) return; // If feed is already loaded, skip fetching
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(response.data.data)); // Assuming you have an action to set feed in Redux
    } catch (err) {
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) return <div>Loading feed...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center mx-auto py-6">
      {feedData.length === 0 ? (
        <div className="text-gray-500 text-2xl">No Feed to show</div>
      ) : (
        <div>
          <UserCard user={feedData[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
