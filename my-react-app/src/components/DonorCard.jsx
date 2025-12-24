import React from "react";
import BloodBadge from "./BloodBadge.jsx";
import { MapPin, Phone, Timer, ShieldCheck } from "lucide-react";

export default function DonorCard({ donor, onNotify, onView }) {
  return (
    <div className="card donorCard">
      <div className="rowBetween">
        <div className="rowGap">
          <div className="avatar">{donor.name?.slice(0, 1)?.toUpperCase() || "D"}</div>
          <div>
            <div className="cardTitle">{donor.name}</div>
            <div className="muted small">
              <MapPin size={14} /> {donor.area} • {donor.radiusKm} km radius
            </div>
          </div>
        </div>
        <BloodBadge group={donor.bloodGroup} />
      </div>

      <div className="grid2 mt12">
        <div className="pill">
          <Timer size={14} />
          <span>Available: {donor.availableNow ? "Now" : "Later"}</span>
        </div>
        <div className="pill">
          <ShieldCheck size={14} />
          <span>Last donated: {donor.lastDonated || "N/A"}</span>
        </div>
      </div>

      <div className="rowBetween mt12">
        <div className="muted small">
          <Phone size={14} /> {donor.phoneMasked}
        </div>
        <div className="rowGap">
          <button className="btnGhost" onClick={() => onView?.(donor)}>View</button>
          <button className="btn" onClick={() => onNotify?.(donor)}>Notify</button>
        </div>
      </div>
    </div>
  );
}
