import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rohan@test.co.in");
  const [password, setPassword] = useState("Abcd@111");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const user = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUser(user.data.user));
      navigate("/feed");
    } catch (error) {
      console.error("Login failed:", error);
    }
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
