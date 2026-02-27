import { useEffect, useState } from "react";
import API from "../api/axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/match/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        console.log("MATCH RESPONSE:", res.data);

        setData(res.data.results || res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  const total = Array.isArray(data) ? data.length : 0;

  const eligible = Array.isArray(data)
    ? data.filter(item => item.status === "Eligible").length
    : 0;

  const topScore = Array.isArray(data) && data.length > 0
    ? Math.max(...data.map(item => item.score))
    : 0;

  return (
    <div className="container">

  
      <div className="header">
        <h1 className="title">🎓 Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

   
      <div className="stats">
        <div className="card">
          <h3>Total</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Eligible</h3>
          <p>{eligible}</p>
        </div>

        <div className="card">
          <h3>Top Score</h3>
          <p>{topScore}</p>
        </div>
      </div>

    
      <div className="list">
        {Array.isArray(data) && data.length === 0 && <p>No data</p>}

        {Array.isArray(data) &&
          data.map((item, index) => (
            <div key={index} className="item">
              <h3>{item.name}</h3>
              <p>{item.provider}</p>
              <p>Score: {item.score}</p>

              <p
                className={`status ${
                  item.status === "Eligible"
                    ? "eligible"
                    : item.status === "Partially Eligible"
                    ? "partial"
                    : "not"
                }`}
              >
                {item.status}
              </p>

              <p>₹ {item.amount}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;