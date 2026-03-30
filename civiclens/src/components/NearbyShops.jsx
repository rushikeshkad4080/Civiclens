import { useEffect, useState } from "react";

<img
  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
  style={{
    width: "100%",
    borderRadius: "18px",
    marginBottom: "20px"
  }}
/>


export default function NearbyShops() {
  const [shops, setShops] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/shops")
      .then((res) => res.json())
      .then((data) => setShops(data));
  }, []);

  const searchShops = async () => {
    const res = await fetch("http://127.0.0.1:8000/shops/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    setShops(data);
  };

  return (
    <section className="dashboard">
      <h2>🛍️ Nearby Shops</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search like: nearby kirana shops"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "10px" }}
        />
        <button onClick={searchShops}>Search</button>
      </div>

      <div className="cards">
        {shops.map((shop) => (
          <div className="card" key={shop.id}>
            <h3>{shop.name}</h3>
            <p><b>Category:</b> {shop.category}</p>
            <p>{shop.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
