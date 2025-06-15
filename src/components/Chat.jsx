import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId, targetFirstName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const senderId = user?._id;

  const getChatHistory = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getchathistory/${targetUserId}/${targetFirstName}`,
        {
          withCredentials: true,
        }
      );
      console.log("Chat history response:", response.data);
      if (
        response.data &&
        response.data.data &&
        response.data.data.messages.length > 0
      ) {
        let messages = response.data.data.messages;
        messages = messages.map((msg) => {
          return { message: msg.text, firstName: msg.firstName };
        });

        console.log("Messages:", messages);
        setMessages(messages);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (targetUserId && targetFirstName) {
      getChatHistory();
    }
  }, []);

  useEffect(() => {
    if (!senderId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      senderId,
      firstName: user.firstName,
      targetUserId,
    });

    socket.on(
      "receiveMessage",
      ({ senderId, firstName, targetUserId, message }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, firstName },
        ]);
        console.log(`Received message from ${firstName}: ${message}`);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [senderId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      senderId,
      firstName: user.firstName,
      targetUserId,
      targetFirstName,
      message: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div>
      {/* UI similar to chat window */}
      <div className="flex flex-col h-125 max-h-md max-w-md mx-auto bg-white shadow-lg rounded-lg my-5">
        <div className="header bg-blue-500 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold">Chat with {targetFirstName}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => {
            return (
              <div
                className={`chat ${
                  user.firstName === msg.firstName ? "chat-end" : "chat-start"
                }`}
                key={index}
              >
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble bg-blue-200">{msg.message}</div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border rounded-md p-2 w-full"
              placeholder="Type your message here..."
            />
            <button
              onClick={sendMessage}
              className="btn bg-blue-500 rounded-lg text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
