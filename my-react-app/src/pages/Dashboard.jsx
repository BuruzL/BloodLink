import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Modal from "../components/Modal.jsx";
import toast from "react-hot-toast";
import { BellRing, Search, HeartPulse, Settings2, Users } from "lucide-react";

function makeMockRequests() {
  return [
    { id: "r1", blood: "A+", hospital: "Dhaka Medical", time: "Within 2 hours", status: "Broadcasted", matches: 18, accepted: 3 },
    { id: "r2", blood: "O-", hospital: "Square Hospital", time: "Urgent", status: "Open", matches: 7, accepted: 0 },
  ];
}

export default function Dashboard() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [requests, setRequests] = useState([]);
  const [openHelp, setOpenHelp] = useState(false);

  useEffect(() => {
    setRequests(makeMockRequests());
  }, []);

  const quickActions = useMemo(() => {
    return [
      { icon: <HeartPulse size={18} />, title: "Create blood request", desc: "Broadcast urgent needs", onClick: () => nav("/request") },
      { icon: <Search size={18} />, title: "Search donors", desc: "Find donors near hospital", onClick: () => nav("/search") },
      { icon: <Users size={18} />, title: "Donor dashboard", desc: "Manage alerts & availability", onClick: () => nav("/donor") },
      { icon: <Settings2 size={18} />, title: "Profile", desc: "Update your info", onClick: () => nav("/profile") },
    ];
  }, [nav]);

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Dashboard</h2>
          <div className="muted">
            Hi <b>{user?.name}</b> — your blood group: <span className="bloodBadge">{user?.bloodGroup || "—"}</span>
          </div>
        </div>
        <button className="btnGhost" onClick={() => setOpenHelp(true)}>
          <BellRing size={16} /> How it works
        </button>
      </div>

      <div className="grid4 mt16">
        {quickActions.map((a) => (
          <button key={a.title} className="card actionCard" onClick={a.onClick}>
            <div className="iconBox">{a.icon}</div>
            <div className="cardTitle">{a.title}</div>
            <div className="muted small">{a.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt16">
        <div className="rowBetween">
          <h3>Your recent requests</h3>
          <button className="btn" onClick={() => nav("/request")}>New request</button>
        </div>

        <div className="grid2 mt12">
          {requests.map((r) => (
            <div className="card" key={r.id}>
              <div className="rowBetween">
                <div>
                  <div className="cardTitle">{r.hospital}</div>
                  <div className="muted small">Need: <span className="bloodBadge">{r.blood}</span> • {r.time}</div>
                </div>
                <div className="pillStrong">{r.status}</div>
              </div>
              <div className="grid3 mt12">
                <div className="metric">
                  <div className="metricNum">{r.matches}</div>
                  <div className="muted small">Matched</div>
                </div>
                <div className="metric">
                  <div className="metricNum">{r.accepted}</div>
                  <div className="muted small">Accepted</div>
                </div>
                <div className="metric">
                  <div className="metricNum">{Math.max(0, r.matches - r.accepted)}</div>
                  <div className="muted small">Pending</div>
                </div>
              </div>

              <div className="rowBetween mt12">
                <button className="btnGhost" onClick={() => toast("Broadcast logic connects to backend later")}>
                  Broadcast again
                </button>
                <button className="btn" onClick={() => nav(`/request/${r.id}`)}>
                  View live
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={openHelp}
        title="How BloodLink works"
        onClose={() => setOpenHelp(false)}
        actions={<button className="btn" onClick={() => setOpenHelp(false)}>Got it</button>}
      >
        <ol className="list">
          <li>Create a blood request (blood type, hospital, time, cause).</li>
          <li>We match donors by blood group + radius + availability.</li>
          <li>Broadcast alert → donors accept/decline.</li>
          <li>You see accepted donors and contact them quickly.</li>
        </ol>
      </Modal>
    </div>
  );
}
