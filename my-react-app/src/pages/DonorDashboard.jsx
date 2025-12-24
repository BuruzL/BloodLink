import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { BellRing, CheckCircle2, XCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function mockInbox() {
  return [
    { id: "a1", blood: "A+", hospital: "Dhaka Medical", time: "Urgent", location: "Dhanmondi", status: "NEW" },
    { id: "a2", blood: "O+", hospital: "Square Hospital", time: "Today", location: "Panthapath", status: "NEW" },
  ];
}

export default function DonorDashboard() {
  const { user, updateUser } = useAuth();
  const nav = useNavigate();
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    setInbox(mockInbox());
  }, []);

  const toggleAvailability = () => {
    updateUser({ availableNow: !user?.availableNow });
    toast.success(`Availability: ${!user?.availableNow ? "Available" : "Not available"}`);
  };

  const respond = (id, status) => {
    setInbox((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success(status === "ACCEPTED" ? "Accepted request" : "Declined request");
  };

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Donor dashboard</h2>
          <div className="muted">
            Donor mode: <b>{user?.donorEnabled ? "ON" : "OFF"}</b> • Status:{" "}
            <span className={user?.availableNow ? "pillOk" : "pillBad"}>
              {user?.availableNow ? "Available" : "Not available"}
            </span>
          </div>
        </div>
        <div className="rowGap">
          <button className="btnGhost" onClick={() => nav("/donor-settings")}>
            <Settings size={16} /> Donor settings
          </button>
          <button className="btn" onClick={toggleAvailability}>
            <BellRing size={16} /> Toggle availability
          </button>
        </div>
      </div>

      <div className="mt16">
        <h3>Incoming alerts</h3>
        <div className="grid2 mt12">
          {inbox.map((a) => (
            <div className="card" key={a.id}>
              <div className="rowBetween">
                <div>
                  <div className="cardTitle">{a.hospital}</div>
                  <div className="muted small">
                    Need: <span className="bloodBadge">{a.blood}</span> • {a.time} • {a.location}
                  </div>
                </div>
                <div className="pillStrong">{a.status}</div>
              </div>

              <div className="rowBetween mt12">
                <button className="btnGhost" onClick={() => respond(a.id, "DECLINED")}>
                  <XCircle size={16} /> Decline
                </button>
                <button className="btn" onClick={() => respond(a.id, "ACCEPTED")}>
                  <CheckCircle2 size={16} /> Accept
                </button>
              </div>

              <div className="muted small mt8">
                Backend: accepting will share your contact to requester securely.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
