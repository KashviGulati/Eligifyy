import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register/", form);

      alert("Signup successful!");
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        <h1 className="logo">
          Eligify<span>.</span>
        </h1>

        <p className="subtitle">
          Create your account
        </p>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSignup}>Sign Up</button>

        <div className="switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;