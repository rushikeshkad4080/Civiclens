import { useEffect, useState } from "react";

export default function IssuesList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/issues")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="dashboard">
      <h2>Reported Civic Issues</h2>

      {loading && <p>Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <p>No issues reported yet.</p>
      )}

      <div className="cards">
        {issues.map((issue) => (
          <div key={issue.id} className="card">
            <h3>Issue #{issue.id}</h3>
            <p><b>Description:</b> {issue.description}</p>
            <p><b>Type:</b> {issue.issue_type}</p>
            <p>
              <b>Priority:</b>{" "}
              <span
                style={{
                  color:
                    issue.priority === "High"
                      ? "red"
                      : issue.priority === "Medium"
                      ? "orange"
                      : "green"
                }}
              >
                {issue.priority}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
