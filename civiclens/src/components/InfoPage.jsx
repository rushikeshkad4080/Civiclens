export default function InfoPage({ onRoleConfirmed }) {
  const selectRole = async (role) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/select-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      onRoleConfirmed(role);
    } catch (err) {
      alert("Backend not reachable");
    }
  };

  return (
    <div className="info-page">

      {/* HERO SECTION (BACKGROUND IMAGE + TEXT OVERLAY) */}
      <section
        className="info-hero-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1570129477492-45c003edd2be')"
        }}
      >
        <div className="overlay">
          <h1 className="hero-title">CIVICLENS</h1>
          <p className="hero-subtitle">
            AI-powered civic intelligence for smarter cities
          </p>
        </div>
      </section>

      {/* PROBLEMS WE SOLVE */}
      <section className="info-section">
        <h2>Problems We Solve</h2>

        <div className="cards">
          <div className="card">
            🚧 <br /> Potholes & Road Damage
          </div>
          <div className="card">
            🚯 <br /> Garbage & Cleanliness
          </div>
          <div className="card">
            💧 <br /> Water & Infrastructure
          </div>
          <div className="card">
            🚦 <br /> Traffic & Safety
          </div>
        </div>
      </section>

      {/* ROLE SELECTION */}
      <section className="info-section light">
        <h2>Continue As</h2>

        <div className="role-buttons">
          <button onClick={() => selectRole("civilian")}>
            👤 Civilian
          </button>

          <button onClick={() => selectRole("admin")}>
            🏛️ Admin
          </button>
        </div>
      </section>

    </div>
  );
}
