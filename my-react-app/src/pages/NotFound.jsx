import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card center">
        <h2>404</h2>
        <p className="muted">Page not found.</p>
        <Link className="btn" to="/">Go home</Link>
      </div>
    </div>
  );
}
