import { useState } from "react";

export default function Login({ setRole }) {
  const [selectedRole, setSelectedRole] = useState("");

  const handleLogin = () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    localStorage.setItem("role", selectedRole);
    setRole(selectedRole);
  };

  return (
    <div style={styles.container}>
      <h1>CIVICLENS</h1>
      <h3>Select Your Role</h3>

      <div style={styles.buttons}>
        <button onClick={() => setSelectedRole("civilian")}>
          Civilian
        </button>
        <button onClick={() => setSelectedRole("admin")}>
          Admin
        </button>
      </div>

      <button style={styles.loginBtn} onClick={handleLogin}>
        Continue
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  buttons: {
    display: "flex",
    gap: "20px",
    margin: "20px"
  },
  loginBtn: {
    padding: "10px 30px",
    fontSize: "16px"
  }
};
