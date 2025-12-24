import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    bloodGroup: user?.bloodGroup || "O+",
    phone: user?.phone || "",
    area: user?.area || "",
    radiusKm: user?.radiusKm || 8,
    donorEnabled: !!user?.donorEnabled,
  });

  const save = (e) => {
    e.preventDefault();
    updateUser(form);
    toast.success("Profile updated");
  };

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Profile</h2>
          <div className="muted">Keep your info accurate for fast emergency coordination.</div>
        </div>
        <button className="btnGhost" onClick={() => nav("/dashboard")}>Back</button>
      </div>

      <div className="card mt16">
        <form className="form" onSubmit={save}>
          <div className="grid2">
            <div className="formRow">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="formRow">
              <label>Blood group</label>
              <select value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}>
                {BLOOD.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="grid2">
            <div className="formRow">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" />
            </div>
            <div className="formRow">
              <label>Area</label>
              <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="Dhanmondi / Chittagong..." />
            </div>
          </div>

          <div className="grid2">
            <div className="formRow">
              <label>Radius (km): <b>{form.radiusKm}</b></label>
              <input type="range" min="1" max="50" value={form.radiusKm} onChange={(e) => setForm({ ...form, radiusKm: Number(e.target.value) })} />
            </div>

            <div className="formRow">
              <label>Donor mode</label>
              <div className="rowBetween">
                <div className="muted small">Receive donation alerts & match requests</div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={form.donorEnabled}
                    onChange={(e) => setForm({ ...form, donorEnabled: e.target.checked })}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>

          <button className="btn full" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
