import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import "./sidebar.scss";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  const [loadProjects, setLoadProjects] = useState(false);

  const { dispatch } = useContext(DarkModeContext);
  const { logout } = useAuth();
  const handleProjectsClick = () => {
    setLoadProjects(!loadProjects);
  };

  useEffect(() => {
    if (loadProjects) {
      axios.get('http://localhost:3001/projects')
        .then(response => setProjects(response.data))
        .catch(error => console.error('Erreur lors de la récupération des projets :', error));
    }
  }, [loadProjects]);
  const handleLogout = () => {
    logout(); 
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">GP</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <li>
            <StoreIcon className="icon" />
            <span className='' onClick={handleProjectsClick}>Projects</span>
            {loadProjects && (
              <ul  className="project-list">
                {projects.map((project) => (
                  <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
                    <li className="project-item">
                      <FolderIcon className="icon" />
                      <span>{project.nom}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/documents" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Documents</span>
            </li>
          </Link>
        
          <p className="title">USER</p>
          <Link to="/profil" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>

          <li onClick={handleLogout} >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
       
      </div>
    </div>
  );
};

export default Sidebar;
