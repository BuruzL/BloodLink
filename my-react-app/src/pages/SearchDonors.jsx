import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DonorCard from "../components/DonorCard.jsx";
import Modal from "../components/Modal.jsx";
import toast from "react-hot-toast";
import { Filter, Sparkles } from "lucide-react";

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function mockDonors() {
  return [
    { id: "d1", name: "Rafi", bloodGroup: "A+", area: "Dhanmondi", radiusKm: 8, availableNow: true, lastDonated: "3 months ago", phoneMasked: "01***1234" },
    { id: "d2", name: "Nusrat", bloodGroup: "A+", area: "Mohammadpur", radiusKm: 12, availableNow: true, lastDonated: "5 months ago", phoneMasked: "01***8841" },
    { id: "d3", name: "Sabbir", bloodGroup: "O+", area: "Mirpur", radiusKm: 10, availableNow: false, lastDonated: "2 months ago", phoneMasked: "01***2290" },
    { id: "d4", name: "Tasnim", bloodGroup: "A-", area: "Farmgate", radiusKm: 6, availableNow: true, lastDonated: "N/A", phoneMasked: "01***7770" },
  ];
}

export default function SearchDonors() {
  const nav = useNavigate();
  const loc = useLocation();

  const preset = loc.state?.preset;

  const [filters, setFilters] = useState({
    blood: preset?.patientBlood || "A+",
    availableOnly: true,
    radiusKm: preset?.radiusKm || 10,
    query: preset?.hospital || "",
  });

  const [all, setAll] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAll(mockDonors());
  }, []);

  const results = useMemo(() => {
    return all.filter((d) => {
      if (filters.blood && d.bloodGroup !== filters.blood) return false;
      if (filters.availableOnly && !d.availableNow) return false;
      if (d.radiusKm < filters.radiusKm) return false;
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        if (!d.area.toLowerCase().includes(q)) return true; // allow loose matching
      }
      return true;
    });
  }, [all, filters]);

  const notifyOne = (donor) => {
    toast.success(`Notified ${donor.name} (demo)`);
  };

  const viewDonor = (donor) => {
    setSelected(donor);
    setOpen(true);
  };

  const createRequestFromSearch = () => {
    nav("/request");
  };

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Search donors</h2>
          <div className="muted">Filter donors by blood group, radius, availability.</div>
        </div>
        <button className="btn" onClick={createRequestFromSearch}>
          <Sparkles size={16} /> Create request
        </button>
      </div>

      <div className="card mt16">
        <div className="rowBetween">
          <div className="rowGap">
            <div className="pillStrong"><Filter size={14} /> Filters</div>
            <div className="muted small">Results: <b>{results.length}</b></div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={filters.availableOnly}
              onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
            />
            <span className="slider" />
          </label>
        </div>

        <div className="grid3 mt12">
          <div className="formRow">
            <label>Blood group</label>
            <select value={filters.blood} onChange={(e) => setFilters({ ...filters, blood: e.target.value })}>
              {BLOOD.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div className="formRow">
            <label>Minimum donor radius (km): <b>{filters.radiusKm}</b></label>
            <input type="range" min="1" max="50" value={filters.radiusKm} onChange={(e) => setFilters({ ...filters, radiusKm: Number(e.target.value) })} />
          </div>

          <div className="formRow">
            <label>Area keyword (optional)</label>
            <input value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} placeholder="Dhanmondi / Mirpur..." />
          </div>
        </div>
      </div>

      <div className="grid2 mt16">
        {results.map((d) => (
          <DonorCard key={d.id} donor={d} onNotify={notifyOne} onView={viewDonor} />
        ))}
      </div>

      <Modal
        open={open}
        title="Donor details (demo)"
        onClose={() => setOpen(false)}
        actions={
          <div className="rowGap">
            <button className="btnGhost" onClick={() => setOpen(false)}>Close</button>
            <button className="btn" onClick={() => notifyOne(selected)}>Notify</button>
          </div>
        }
      >
        {selected && (
          <div className="muted">
            <div><b>Name:</b> {selected.name}</div>
            <div><b>Blood:</b> {selected.bloodGroup}</div>
            <div><b>Area:</b> {selected.area}</div>
            <div><b>Available:</b> {selected.availableNow ? "Yes" : "No"}</div>
            <div className="small mt8">
              When backend is ready, this modal can show full profile + verification + call button.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
