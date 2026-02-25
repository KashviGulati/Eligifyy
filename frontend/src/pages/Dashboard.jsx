import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/match/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setData(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.provider}</p>
          <p>Score: {item.score}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;