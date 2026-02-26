import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function ProfileForm() {
  const [form, setForm] = useState({
    age: "",
    income: "",
    category: "",
    cgpa: "",
    state: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/profile/", form, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      alert("Profile saved!");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Error saving profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h2 className="profile-title">Create Profile</h2>

        <input placeholder="Age" onChange={(e) => setForm({...form, age: e.target.value})} />
        <input placeholder="Income" onChange={(e) => setForm({...form, income: e.target.value})} />
        <input placeholder="Category" onChange={(e) => setForm({...form, category: e.target.value})} />
        <input placeholder="CGPA" onChange={(e) => setForm({...form, cgpa: e.target.value})} />
        <input placeholder="State" onChange={(e) => setForm({...form, state: e.target.value})} />
        <input placeholder="Gender" onChange={(e) => setForm({...form, gender: e.target.value})} />

        <button className="profile-btn" onClick={handleSubmit}>
          Save Profile
        </button>

      </div>
    </div>
  );
}

export default ProfileForm;