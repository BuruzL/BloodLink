import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthRegister() {
  const nav = useNavigate();
  const { registerMock } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    donorEnabled: true,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerMock(form);
      nav("/onboarding");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="authGrid">
        <div className="card authCard">
          <h2>Create your BloodLink account</h2>
          <p className="muted">One login. Choose if you want to donate now or later.</p>

          <form onSubmit={onSubmit} className="form">
            <div className="formRow">
              <label>Full name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="formRow">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
              />
            </div>

            <div className="formRow">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="rowBetween">
              <div>
                <div className="labelStrong">Donate blood in the future?</div>
                <div className="muted small">You can toggle this later.</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={form.donorEnabled}
                  onChange={(e) => setForm({ ...form, donorEnabled: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>

            <button className="btn full" type="submit">Create account</button>

            <div className="muted small">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>

        <div className="card authSide">
          <div className="authSideTitle">What you’ll get</div>
          <ul className="list">
            <li>Fast donor discovery near your hospital</li>
            <li>Broadcast request to matched donors</li>
            <li>Live accept/decline tracking</li>
            <li>Donor availability + radius control</li>
          </ul>
          <div className="muted small">
            Tip: Start as requester; enable donor mode whenever you want.
          </div>
        </div>
      </div>
    </div>
  );
}
