import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Droplet, LogOut, UserRound, LayoutDashboard, HeartPulse } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="nav">
      <div className="navInner">
        <Link to="/" className="brand">
          <span className="brandIcon"><Droplet size={18} /></span>
          <span className="brandText">BloodLink</span>
          <span className="badge">Emergency</span>
        </Link>

        <nav className="navLinks">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                <LayoutDashboard size={16} /> Dashboard
              </NavLink>
              <NavLink to="/request" className={({ isActive }) => (isActive ? "active" : "")}>
                <HeartPulse size={16} /> Request Blood
              </NavLink>
              <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
                Search Donors
              </NavLink>
            </>
          )}
        </nav>

        <div className="navRight">
          {!user ? (
            <>
              <button className="btnGhost" onClick={() => nav("/login")}>Login</button>
              <button className="btn" onClick={() => nav("/register")}>Create account</button>
            </>
          ) : (
            <>
              <button className="chip" onClick={() => nav("/profile")}>
                <UserRound size={16} />
                <span>{user.name}</span>
              </button>
              <button className="btnGhost" onClick={logout} title="Logout">
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
