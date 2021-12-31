import { useNavigate } from "react-router-dom";
import Feed from "./feed/Feed";
import Sidebar from "./sidebar/Sidebar";
import Widget from "./widget/Widget";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />
      <Feed />
      <Widget />
    </div>
  );
};

export default Dashboard;
