import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    bloodGroup: user?.bloodGroup || "O+",
    age: "",
    phone: "",
    area: "",
    radiusKm: 8,
    availableNow: true,
  });

  useEffect(() => {
    if (!user) return;
    // If already has essentials, you can skip later.
  }, [user]);

  const roleText = useMemo(() => {
    if (user?.donorEnabled) return "You can request blood and also receive donor alerts.";
    return "You can request blood. You can enable donor mode later.";
  }, [user]);

  const useMyLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // In real app, reverse-geocode. For now, store coords string.
        setForm((f) => ({ ...f, area: `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}` }));
        toast.success("Location captured");
      },
      () => toast.error("Could not get location. Allow permission.")
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({
      bloodGroup: form.bloodGroup,
      age: form.age,
      phone: form.phone,
      area: form.area,
      radiusKm: form.radiusKm,
      availableNow: form.availableNow,
      role: user?.donorEnabled ? "donor" : "requester",
    });
    toast.success("Setup complete!");
    nav("/dashboard");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="rowBetween">
          <div>
            <h2>Quick setup</h2>
            <div className="muted">{roleText}</div>
          </div>
          <div className="pillStrong">
            Donor mode: <b>{user?.donorEnabled ? "ON" : "OFF"}</b>
          </div>
        </div>

        <form className="form mt16" onSubmit={onSubmit}>
          <div className="grid2">
            <div className="formRow">
              <label>Blood group</label>
              <select value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}>
                {BLOOD.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="formRow">
              <label>Age</label>
              <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="e.g., 21" />
            </div>
          </div>

          <div className="grid2">
            <div className="formRow">
              <label>Contact number</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" />
            </div>
            <div className="formRow">
              <label>Area (or hospital zone)</label>
              <div className="rowGap">
                <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="Dhanmondi / CUET / Chittagong..." />
                <button type="button" className="btnGhost" onClick={useMyLocation}>Use my location</button>
              </div>
            </div>
          </div>

          <div className="grid2">
            <div className="formRow">
              <label>Donation radius (km): <b>{form.radiusKm}</b></label>
              <input
                type="range"
                min="1"
                max="50"
                value={form.radiusKm}
                onChange={(e) => setForm({ ...form, radiusKm: Number(e.target.value) })}
              />
              <div className="muted small">We match requests within your chosen radius.</div>
            </div>

            <div className="formRow">
              <label>Available right now?</label>
              <div className="rowGap">
                <button
                  type="button"
                  className={form.availableNow ? "segActive" : "seg"}
                  onClick={() => setForm({ ...form, availableNow: true })}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={!form.availableNow ? "segActive" : "seg"}
                  onClick={() => setForm({ ...form, availableNow: false })}
                >
                  Not now
                </button>
              </div>
              <div className="muted small">Donor alerts respect this status.</div>
            </div>
          </div>

          <button className="btn full mt8" type="submit">Finish setup</button>
        </form>
      </div>
    </div>
  );
}
