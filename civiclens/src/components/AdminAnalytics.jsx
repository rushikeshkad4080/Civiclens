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

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/analytics")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  const barData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Issue Status",
        data: [
          data.status.pending,
          data.status.in_progress,
          data.status.resolved
        ],
        backgroundColor: ["#ffc107", "#0dcaf0", "#198754"]
      }
    ]
  };

  const pieData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          data.priority.high,
          data.priority.medium,
          data.priority.low
        ],
        backgroundColor: ["#dc3545", "#fd7e14", "#198754"]
      }
    ]
  };

  return (
    <div className="dashboard">
      <h2>📊 City Analytics</h2>

      <div className="cards">
        <div className="card">
          <h3>Status Overview</h3>
          <Bar data={barData} />
        </div>

        <div className="card">
          <h3>Priority Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
