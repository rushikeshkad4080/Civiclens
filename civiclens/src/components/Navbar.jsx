export default function Navbar({ page, setPage }) {
  const tabs = [
    { id: "report", label: "📝 Report Problem" },
    { id: "map", label: "🗺️ City Map" },
    { id: "shops", label: "🛍️ Nearby Shops" },
    { id: "issues", label: "📋 All Issues" },
    { id: "about", label: "🏙️ About City" }
  ];

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1>CIVICLENS</h1>
      </div>

      <div className="nav-right">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-btn ${page === tab.id ? "active" : ""}`}
            onClick={() => setPage(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
