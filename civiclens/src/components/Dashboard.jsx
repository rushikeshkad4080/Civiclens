export default function Dashboard() {
  return (
    <section className="dashboard">
      <h2>City Intelligence Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>🚦 Traffic Risk</h3>
          <p>High congestion predicted at 6–9 PM</p>
        </div>

        <div className="card">
          <h3>🗑️ Sanitation</h3>
          <p>12 new garbage hotspots detected</p>
        </div>

        <div className="card">
          <h3>🌫️ Air Quality</h3>
          <p>Moderate – Wear masks outdoors</p>
        </div>
      </div>
    </section>
  );
}
