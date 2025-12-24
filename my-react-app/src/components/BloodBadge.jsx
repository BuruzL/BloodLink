import React from "react";

export default function BloodBadge({ group = "O+" }) {
  return <span className="bloodBadge">{group}</span>;
}
