import React from "react";
import "./SidebarOption.css";
import { useNavigate } from "react-router";

function SidebarOption({ active, text, Icon }) {
  const navigate = useNavigate();
  return (
    <div
      className={`sidebarOption ${active && "sidebarOption--active"}`}
      onClick={() => navigate("/dashboard")}
    >
      {active ? <Icon style={{ fill: "var(--twitter-color)" }} /> : <Icon />}
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
