import React, { useEffect } from "react";

export default function Modal({ open, title, children, onClose, actions }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div className="modalTitle">{title}</div>
          <button className="btnGhost" onClick={onClose}>Close</button>
        </div>
        <div className="modalBody">{children}</div>
        {actions && <div className="modalActions">{actions}</div>}
      </div>
    </div>
  );
}
