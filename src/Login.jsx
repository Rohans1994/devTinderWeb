import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log("Email:", emailId);
    console.log("Password:", password);
    const user = await axios.post(
      "http://localhost:3000/login",
      {
        emailId,
        password,
      },
      { withCredentials: true }
    );
    console.log("User:", user.data);
  };
  return (
    <div className="flex justify-center my-4">
      <div className="card bg-info-content text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <p className="label">Enter your Email id</p>
          <input
            type="text"
            placeholder="example@example.com"
            className="input text-black"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <p className="label">Enter your Password</p>
          <input
            type="password"
            placeholder="Password"
            className="input text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions justify-center my-2">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
