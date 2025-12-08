import React, { useRef, useState } from "react";
import UserCard from "./FeedCard/UserCard";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/appConstant";
import { addUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast,useToast } from "../common/Toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { toast, showSuccess, showError } = useToast();
  const handleInputChange = (setter) => (e) => setter(e.target.value);
 
  const dispatch = useDispatch();

  const uploadPhoto = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  // Convert file to Base64
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    const base64Image = reader.result;   // Cloudinary-ready Base64 string
    setPhotoUrl(base64Image);          
  };
};

  const saveProfile = async () => {
    try {
      const updateData = {
        firstName,
        lastName,
        gender,
        about,
        age,
        photoUrl,
        skills
      };
    
      const res = await axios.patch(
        `${API_BASE_URL}${API_ENDPOINTS.USERS.UPDATE}`, 
        updateData, 
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data.data));
      showSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Failed to update profile. Please try again.";
      showError(errorMessage);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6 justify-center">
      {/* FORM CARD */}
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Edit Profile</h2>

        {/* NAME */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="font-semibold text-gray-700">First Name</label>
            <input
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="John"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Last Name</label>
            <input
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Doe"
              value={lastName}
              onChange={handleInputChange(setLastName)}
            />
          </div>
        </div>

        {/* AGE + GENDER */}
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div>
            <label className="font-semibold text-gray-700">Age</label>
            <input
              type="number"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="25"
              value={age}
              onChange={handleInputChange(setAge)}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Gender</label>
            <select
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-red-400 focus:outline-none"
              value={gender}
              onChange={handleInputChange(setGender)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-3">
          <label className="font-semibold text-gray-700">About</label>
          <textarea
            className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
            rows={4}
            placeholder="Say something interesting about yourself..."
            value={about}
            onChange={handleInputChange(setAbout)}
          />
        </div>
        {/* PHOTO GALLERY */}
        <div className="mt-3">
          <label className="font-semibold">Photos</label>

          <div className="flex gap-4 mt-3">
            <img
              src={photoUrl || "https://via.placeholder.com/150"}
              className="w-24 h-24 rounded-xl object-cover"
              alt="preview"
            />

            <label
              className="w-24 h-24 border border-gray-300 rounded-xl 
                      flex items-center justify-center text-gray-400 text-4xl cursor-pointer"
            >
              +
              <input
                type="file"
                className="hidden"
                accept="image/*"
             ref={fileInputRef}
              onChange={uploadPhoto}
              />
            </label>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-3">
          <label className="font-semibold text-gray-700">Skills</label>

          <div className="flex flex-wrap gap-3 mt-3">
            {skills.length === 0 && (
              <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">
                No skills added
              </span>
            )}

            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 shadow-sm"
              >
                {skill}
                <button
                  className="text-red-500 font-bold text-lg"
                  onClick={() => {
                    setSkills(skills.filter((_, i) => i !== index));
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            className="w-full mt-4 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
            placeholder="Add skill and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                setSkills([...skills, e.target.value.trim()]);
                e.target.value = "";
              }
            }}
          />
        </div>

        {/* SAVE BUTTON */}
        <button  onClick={saveProfile}className="w-full mt-3 bg-red-500 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-red-600 transition">
          Save Profile
        </button>
      </div>

      {/* LIVE PREVIEW */}
      <div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
        />
      </div>
     {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default EditProfile;
