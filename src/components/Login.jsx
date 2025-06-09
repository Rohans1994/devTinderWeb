import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rohan@test.co.in");
  const [password, setPassword] = useState("Abcd@111");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup
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
      dispatch(setUser(user.data.data));
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data || "Login failed");
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUser(user.data.data));
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card bg-info-content text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {showLogin ? "Login" : "Sign Up"}
          </h2>
          {!showLogin && (
            <>
              <p className="label">Enter your First Name</p>
              <input
                type="text"
                placeholder="John"
                className="input text-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <p className="label">Enter your Last Name</p>
              <input
                type="text"
                placeholder="Doe"
                className="input text-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
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
          <p className="text-red-500">{errorMessage}</p>
          <div className="card-actions justify-center my-2">
            <button
              className="btn"
              onClick={showLogin ? handleLogin : handleSignUp}
            >
              {showLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="text-center text-sm">
            <span className="link" onClick={() => setShowLogin(!showLogin)}>
              {showLogin
                ? "Don't have an account? Click Here to Sign Up"
                : "Already have an account? Click Here to Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
