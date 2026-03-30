import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function IssuesMap() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch(() => setIssues([]));
  }, []);

  return (
    <section className="dashboard">
      <h2>City Map</h2>

      <MapContainer
        center={[19.076, 72.8777]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {issues
          .filter((i) => i.latitude && i.longitude)
          .map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.latitude, issue.longitude]}
            >
              <Popup>
                <b>{issue.issue_type}</b><br />
                {issue.description}<br />
                Priority: {issue.priority}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </section>
  );
}
