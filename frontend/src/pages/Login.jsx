import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login/", form);

      const token = res.data.access;

      if (!token) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", token);

      const profileRes = await API.get("/profile/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!profileRes.data.exists) {
        navigate("/profile");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        <h1 className="logo">
          Eligify<span>.</span>
        </h1>

        <p className="subtitle">
          Find scholarships tailored for you
        </p>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleLogin}>Login</button>

        <div className="switch">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;