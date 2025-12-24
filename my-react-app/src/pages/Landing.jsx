import React from "react";
import { useNavigate } from "react-router-dom";
import { Siren, Search, BellRing, Shield, HeartHandshake } from "lucide-react";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="container">
      <section className="hero">
        <div className="heroLeft">
          <div className="heroKicker">
            <Siren size={16} /> Find blood fast. Save lives faster.
          </div>
          <h1 className="heroTitle">
            Blood emergencies, solved like <span className="accent">Uber</span>—but for donors.
          </h1>
          <p className="heroText">
            Create a request, search nearby donors, broadcast alerts, and get real-time responses.
            Designed for urgent situations—simple, fast, and reliable UI.
          </p>

          <div className="heroActions">
            <button className="btn" onClick={() => nav("/register")}>Create account</button>
            <button className="btnGhost" onClick={() => nav("/login")}>Login</button>
          </div>

          <div className="heroStats">
            <div className="stat">
              <div className="statNum">1 min</div>
              <div className="muted small">to broadcast request</div>
            </div>
            <div className="stat">
              <div className="statNum">Radius</div>
              <div className="muted small">match donors near you</div>
            </div>
            <div className="stat">
              <div className="statNum">Live</div>
              <div className="muted small">accept/decline tracking</div>
            </div>
          </div>
        </div>

        <div className="heroRight">
          <div className="glassCard">
            <div className="glassTitle">Quick Search (Demo)</div>
            <div className="formRow">
              <label>Blood type needed</label>
              <select defaultValue="A+">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <div className="formRow">
              <label>Hospital / Area</label>
              <input placeholder="Dhaka Medical / Dhanmondi / CUET..." />
            </div>
            <button className="btn full" onClick={() => nav("/register")}>
              <Search size={16} /> Start using BloodLink
            </button>
            <div className="muted small mt8">
              Login to enable real donor matching + notifications.
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <Feature
          icon={<Search size={18} />}
          title="Smart Matching"
          text="Filter by blood group, distance radius, availability, and urgency time."
        />
        <Feature
          icon={<BellRing size={18} />}
          title="Broadcast Notifications"
          text="Notify all matched donors and see who accepts—instantly."
        />
        <Feature
          icon={<Shield size={18} />}
          title="Safety-first"
          text="Profile fields, donation cooldown, and verification-ready flow."
        />
        <Feature
          icon={<HeartHandshake size={18} />}
          title="Community"
          text="Donors can opt-in anytime; requesters can act fast in emergencies."
        />
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="card">
      <div className="rowGap">
        <div className="iconBox">{icon}</div>
        <div>
          <div className="cardTitle">{title}</div>
          <div className="muted">{text}</div>
        </div>
      </div>
    </div>
  );
}
