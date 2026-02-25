import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/register/", form);

      console.log("SIGNUP RESPONSE:", res.data);

      alert("Signup successful!");

      // go to login page
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

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

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;