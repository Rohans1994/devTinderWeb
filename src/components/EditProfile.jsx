import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [aboutUs, setAboutUs] = useState(user.aboutUs || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [imageUrl, setImageUrl] = useState(user.imageUrl || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleEditProfile = async () => {
    try {
      const updatedProfile = {
        firstName,
        lastName,
        aboutUs,
        age,
        gender,
        imageUrl,
      };

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        updatedProfile,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(response.data.data));
      setErrorMessage(""); // Clear any previous error messages
      setShowToast(true); // Show success toast
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    } catch (error) {
      setErrorMessage(error.response?.data || "Failed to update profile");
    }
  };
  return (
    <>
      <div className="flex justify-center my-4">
        <div className="mx-6">
          <div className="card bg-info-content text-primary-content w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Login</h2>
              <p className="label">FirstName</p>
              <input
                type="text"
                className="input text-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <p className="label">LastName</p>
              <input
                type="text"
                placeholder="example@example.com"
                className="input text-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <p className="label">About Us</p>
              <input
                type="text"
                placeholder="example@example.com"
                className="input text-black"
                value={aboutUs}
                onChange={(e) => setAboutUs(e.target.value)}
              />
              <p className="label">Age</p>
              <input
                type="text"
                placeholder="example@example.com"
                className="input text-black"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="flex join-vertical">
                <p className="label">Gender</p>

                <label className="label cursor-pointer my-2">
                  Male
                  <input
                    type="radio"
                    name="radio-9"
                    className="radio radio-info radio-xs"
                    defaultChecked
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="label cursor-pointer my-2">
                  Female
                  <input
                    type="radio"
                    name="radio-9"
                    className="radio radio-info radio-xs"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>
              <p className="label">Image Url</p>
              <input
                type="text"
                placeholder="example@example.com"
                className="input text-black"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="card-actions justify-center my-2">
                <button className="btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, aboutUs, age, gender, imageUrl }}
        ></UserCard>
      </div>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
