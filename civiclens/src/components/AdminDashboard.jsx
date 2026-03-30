import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, []);

  const total = issues.length;

  const priorityCount = {
    High: issues.filter(i => i.priority === "High").length,
    Medium: issues.filter(i => i.priority === "Medium").length,
    Low: issues.filter(i => i.priority === "Low").length
  };

  const typeCount = {};
  issues.forEach(i => {
    typeCount[i.issue_type] = (typeCount[i.issue_type] || 0) + 1;
  });

  const priorityData = {
    labels: ["High", "Medium", "Low"],
    datasets: [{
      data: Object.values(priorityCount),
      backgroundColor: ["#dc3545", "#ffc107", "#198754"]
    }]
  };

  const typeData = {
    labels: Object.keys(typeCount),
    datasets: [{
      label: "Issues",
      data: Object.values(typeCount),
      backgroundColor: "#0b5ed7"
    }]
  };

  return (
    <div className="dashboard">
      <h2>🏛️ Admin Dashboard</h2>

      {/* STATS */}
      <div className="cards">
        <div className="card">
          <h3>Total Issues</h3>
          <h1>{total}</h1>
        </div>
        <div className="card">
          <h3>High Priority</h3>
          <h1>{priorityCount.High}</h1>
        </div>
        <div className="card">
          <h3>Resolved</h3>
          <h1>{priorityCount.Low}</h1>
        </div>
      </div>

      {/* CHARTS */}
      <div className="cards" style={{ marginTop: "30px" }}>
        <div className="card">
          <h3>Issue Priority Distribution</h3>
          <Pie data={priorityData} />
        </div>

        <div className="card">
          <h3>Issue Types</h3>
          <Bar data={typeData} />
        </div>
      </div>
    </div>
  );
}
