import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function DonorSettings() {
  const { user, updateUser } = useAuth();
  const nav = useNavigate();

  const [cooldownDays, setCooldownDays] = useState(90);
  const [canDonatePlatelets, setCanDonatePlatelets] = useState(false);

  const save = (e) => {
    e.preventDefault();
    updateUser({
      donorPrefs: { cooldownDays, canDonatePlatelets },
    });
    toast.success("Donor settings saved");
    nav("/donor");
  };

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Donor settings</h2>
          <div className="muted">Control safety and alert preferences.</div>
        </div>
        <button className="btnGhost" onClick={() => nav("/donor")}>Back</button>
      </div>

      <div className="card mt16">
        <form className="form" onSubmit={save}>
          <div className="formRow">
            <label>Donation cooldown (days)</label>
            <input
              type="number"
              min="30"
              max="180"
              value={cooldownDays}
              onChange={(e) => setCooldownDays(Number(e.target.value))}
            />
            <div className="muted small">
              UI-level guard; backend should enforce eligibility rules.
            </div>
          </div>

          <div className="rowBetween">
            <div>
              <div className="labelStrong">Platelet donor</div>
              <div className="muted small">Optional capability flag</div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={canDonatePlatelets}
                onChange={(e) => setCanDonatePlatelets(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="card soft mt16">
            <div className="cardTitle">Current donor status</div>
            <div className="muted small">
              Donor mode: <b>{user?.donorEnabled ? "ON" : "OFF"}</b> • Available:{" "}
              <b>{user?.availableNow ? "Yes" : "No"}</b>
            </div>
          </div>

          <button className="btn full mt16" type="submit">Save settings</button>
        </form>
      </div>
    </div>
  );
}
