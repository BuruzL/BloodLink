import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthLogin() {
  const nav = useNavigate();
  const loc = useLocation();
  const { loginMock } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginMock(form);
      const target = loc.state?.from || "/dashboard";
      nav(target);
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="authGrid">
        <div className="card authCard">
          <h2>Welcome back</h2>
          <p className="muted">Login to request blood or manage donor availability.</p>

          <form onSubmit={onSubmit} className="form">
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

            <button className="btn full" type="submit">Login</button>

            <div className="muted small">
              New here? <Link to="/register">Create an account</Link>
            </div>
          </form>
        </div>

        <div className="card authSide">
          <div className="authSideTitle">Demo login</div>
          <div className="muted small">
            Any email/password works for now (mock mode) until your Node backend is ready.
          </div>
        </div>
      </div>
    </div>
  );
}
