import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AlarmClock, Hospital, Siren } from "lucide-react";

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RequestBlood() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    patientBlood: "A+",
    hospital: "",
    cause: "Accident",
    neededWhen: "Within 2 hours",
    units: 1,
    note: "",
    location: "",
    radiusKm: 10,
  });

  const urgencyTag = useMemo(() => {
    if (form.neededWhen.toLowerCase().includes("urgent")) return "Urgent";
    if (form.neededWhen.toLowerCase().includes("hour")) return "High";
    return "Normal";
  }, [form.neededWhen]);

  const submit = (e) => {
    e.preventDefault();

    if (!form.hospital.trim()) return toast.error("Hospital is required");
    if (!form.location.trim()) return toast.error("Location/area is required");

    // In real app: BloodAPI.createRequest(form) -> returns requestId
    const requestId = "r_" + Math.random().toString(16).slice(2);
    toast.success("Request created!");
    nav(`/request/${requestId}`, { state: { request: form } });
  };

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Create blood request</h2>
          <div className="muted">
            Fill details → match donors → broadcast notifications.
          </div>
        </div>
        <div className="pillStrong">
          Priority: <b>{urgencyTag}</b>
        </div>
      </div>

      <div className="card mt16">
        <form className="form" onSubmit={submit}>
          <div className="grid2">
            <div className="formRow">
              <label>Patient blood type</label>
              <select value={form.patientBlood} onChange={(e) => setForm({ ...form, patientBlood: e.target.value })}>
                {BLOOD.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div className="formRow">
              <label>Units needed</label>
              <input
                type="number"
                min="1"
                max="10"
                value={form.units}
                onChange={(e) => setForm({ ...form, units: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid2">
            <div className="formRow">
              <label><Hospital size={14} /> Hospital name</label>
              <input value={form.hospital} onChange={(e) => setForm({ ...form, hospital: e.target.value })} placeholder="Dhaka Medical College Hospital" />
            </div>
            <div className="formRow">
              <label>Location / Area</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Dhanmondi / Chawkbazar / CUET..." />
            </div>
          </div>

          <div className="grid2">
            <div className="formRow">
              <label>Cause</label>
              <select value={form.cause} onChange={(e) => setForm({ ...form, cause: e.target.value })}>
                <option>Accident</option>
                <option>Surgery</option>
                <option>Disease</option>
                <option>Maternity</option>
                <option>Other</option>
              </select>
            </div>

            <div className="formRow">
              <label><AlarmClock size={14} /> Blood needed time</label>
              <select value={form.neededWhen} onChange={(e) => setForm({ ...form, neededWhen: e.target.value })}>
                <option>Urgent</option>
                <option>Within 2 hours</option>
                <option>Within 6 hours</option>
                <option>Today</option>
                <option>Tomorrow</option>
              </select>
            </div>
          </div>

          <div className="formRow">
            <label>Match radius (km): <b>{form.radiusKm}</b></label>
            <input type="range" min="1" max="50" value={form.radiusKm} onChange={(e) => setForm({ ...form, radiusKm: Number(e.target.value) })} />
            <div className="muted small">We’ll search donors within this radius from the hospital/area.</div>
          </div>

          <div className="formRow">
            <label>Extra note (optional)</label>
            <textarea
              rows="4"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Patient condition, ward info, contact person, etc."
            />
          </div>

          <div className="rowBetween">
            <button type="button" className="btnGhost" onClick={() => nav("/search", { state: { preset: form } })}>
              Preview matched donors
            </button>
            <button className="btn" type="submit">
              <Siren size={16} /> Create request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
