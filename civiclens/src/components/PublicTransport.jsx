export default function PublicTransport() 
{
    <img
  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
  style={{
    width: "100%",
    borderRadius: "18px",
    marginBottom: "20px"
  }}
/>

  const transportData = [
    {
      type: "Bus",
      route: "City Center → Railway Station",
      fare: "₹20",
      timing: "Every 15 mins",
      stops: ["City Center", "Market", "Bus Stand", "Railway Station"]
    },
    {
      type: "Metro",
      route: "North City → South City",
      fare: "₹40",
      timing: "Every 10 mins",
      stops: ["North City", "Tech Park", "Central Mall", "South City"]
    },
    {
      type: "Train",
      route: "Local Line A",
      fare: "₹10–₹30",
      timing: "Every 20 mins",
      stops: ["Station A", "Station B", "Station C", "Station D"]
    }
  ];

  return (
    <section className="dashboard">
      <h2>🚍 Public Transport</h2>

      <div className="cards">
        {transportData.map((t, i) => (
          <div className="card" key={i}>
            <h3>{t.type}</h3>
            <p><b>Route:</b> {t.route}</p>
            <p><b>Fare:</b> {t.fare}</p>
            <p><b>Timing:</b> {t.timing}</p>

            <p><b>Stops:</b></p>
            <ul>
              {t.stops.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
