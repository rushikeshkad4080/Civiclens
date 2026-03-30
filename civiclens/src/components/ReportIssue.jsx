import { useState } from "react";

export default function ReportIssue({ presetType }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submitIssue = async () => {
    if (!description) {
      alert("Please describe the issue");
      return;
    }

    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      // ✅ SUCCESS
      async (position) => {
        const formData = new FormData();
        formData.append(
          "description",
          `${presetType ? presetType + " - " : ""}${description}`
        );
        formData.append("latitude", position.coords.latitude);
        formData.append("longitude", position.coords.longitude);
        if (image) formData.append("image", image);

        try {
          const res = await fetch("http://127.0.0.1:8000/report-issue", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          setResponse(data);
          setDescription("");
          setImage(null);
        } catch (err) {
          alert("Backend error");
        } finally {
          setLoading(false);
        }
      },

      // ❌ FALLBACK (Mumbai)
      async () => {
        const formData = new FormData();
        formData.append(
          "description",
          `${presetType ? presetType + " - " : ""}${description}`
        );
        formData.append("latitude", 19.0760);
        formData.append("longitude", 72.8777);
        if (image) formData.append("image", image);

        try {
          await fetch("http://127.0.0.1:8000/report-issue", {
            method: "POST",
            body: formData,
          });

          alert("Location permission denied. Using default city location.");
        } catch (err) {
          alert("Backend error");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <section className="report">
      <h2>Report a City Issue</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <textarea
        placeholder={`Describe the ${presetType || "issue"}`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={submitIssue} disabled={loading}>
        {loading ? "Submitting..." : "Submit to AI"}
      </button>

      {response && (
        <div className="card" style={{ marginTop: "20px" }}>
          <h3>AI Analysis Result</h3>
          <p><b>Issue Type:</b> {response.issue_type}</p>
          <p><b>Priority:</b> {response.priority}</p>
        </div>
      )}
    </section>
  );
}
