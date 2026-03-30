import { useState } from "react";
import InfoPage from "./components/InfoPage";
import AdminDashboard from "./components/AdminDashboard";
import Sidebar from "./components/Sidebar";
import ReportProblem from "./components/ReportProblem";
import IssuesMap from "./components/IssuesMap";
import IssuesList from "./components/IssuesList";
import NearbyShops from "./components/NearbyShops";
import PublicTransport from "./components/PublicTransport";
import AboutCity from "./components/AboutCity";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  // info | civilian | admin
  const [stage, setStage] = useState("info");
  const [page, setPage] = useState("report");

  /* =========================
     INFO / ONBOARDING PAGE
  ========================= */
  if (stage === "info") {
    return (
      <InfoPage
        onRoleConfirmed={(role) => {
          if (role === "admin") {
            setStage("admin");
          } else {
            setStage("civilian");
          }
        }}
      />
    );
  }

  /* =========================
     ADMIN DASHBOARD
  ========================= */
  if (stage === "admin") {
    return (
      <div className="app-layout">
        <Sidebar page="admin" setPage={() => {}} />

        <div className="content-area">
          <AdminDashboard />
          <Footer />
        </div>
      </div>
    );
  }

  /* =========================
     CIVILIAN DASHBOARD
  ========================= */
  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} />

      <div className="content-area">
        {page === "report" && <ReportProblem />}
        {page === "map" && <IssuesMap />}
        {page === "issues" && <IssuesList />}
        {page === "shops" && <NearbyShops />}
        {page === "transport" && <PublicTransport />}
        {page === "about" && <AboutCity />}

        <Footer />
      </div>
    </div>
  );
}
