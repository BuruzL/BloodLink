import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div>
          <div className="footerTitle">BloodLink</div>
          <div className="muted">
            Built for urgent blood discovery + donor coordination.  
            Always verify with hospital/doctor.
          </div>
        </div>
        <div className="muted">© {new Date().getFullYear()} BloodLink</div>
      </div>
    </footer>
  );
}
