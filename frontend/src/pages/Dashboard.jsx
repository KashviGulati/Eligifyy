import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        const res = await API.get("/match/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        console.log("MATCH RESPONSE:", res.data);

        setData(res.data.results || res.data);
      } catch (err) {
        console.log("ERROR:", err);
        setError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  if (error) return <h2>{error}</h2>;

  return (
  <div>
    <h1>Dashboard</h1>

    {/* If no data */}
    {Array.isArray(data) && data.length === 0 && (
      <p>No data</p>
    )}

    {/* Actual data */}
    {Array.isArray(data) &&
      data.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.status}</p>
        </div>
      ))}
  </div>
);}

export default Dashboard;