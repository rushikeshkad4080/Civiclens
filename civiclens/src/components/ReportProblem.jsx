import { useState } from "react";
import ReportIssue from "./ReportIssue";
import { motion } from "framer-motion";

const problemTypes = [
  "Pothole Problem",
  "Water Problem",
  "Garbage Problem",
  "Streetlight Problem",
  "Other",
];

export default function ReportProblem() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <>
        <button onClick={() => setSelected(null)}>⬅ Back</button>
        <ReportIssue presetType={selected} />
      </>
    );
  }

  return (
    <section className="dashboard">
      <h2>Report a Problem</h2>

      <div className="cards">
        {problemTypes.map((type) => (
          <motion.div
            key={type}
            className="card"
            onClick={() => setSelected(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ cursor: "pointer" }}
          >
            <h3>{type}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
