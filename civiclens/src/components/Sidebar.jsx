export default function Sidebar({ page, setPage }) {
  const menus = [
    { id: "report", label: "📝 Report Issue" },
    { id: "map", label: "🗺️ City Map" },
    { id: "issues", label: "📋 Issues" },
    { id: "shops", label: "🛍️ Nearby Shops" },
    { id: "transport", label: "🚍 Public Transport" },
    { id: "about", label: "🏙️ About City" }
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">CIVICLENS</h2>

      {menus.map((m) => (
        <button
          key={m.id}
          className={`sidebar-btn ${page === m.id ? "active" : ""}`}
          onClick={() => setPage(m.id)}
        >
          {m.label}
        </button>
      ))}
    </aside>
  );
}
