import React, { useState } from "react"; 
import "./usersidebar.scss";
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
import { Link, useParams } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useAuth } from "../../context/authContext"; 

const Usersidebar = () => {
  const { user } = useAuth(); 
  const userId = localStorage.getItem("userId");
  const { logout } = useAuth();

  const { dispatch } = useContext(DarkModeContext);

 
  const handleLogout = () => {
    logout(); 
  };
  return (
    <div className="sidebar1">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">GP</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={`/user/${userId}`} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to={`/user/${userId}/Tasks`} style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Tasks</span>
            </li>
          </Link>
         

          <Link to={`/user/${userId}/Documents`}  style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Documents</span>
            </li>
          </Link>

          <p className="title">USEFUL</p> 
                <li>
                <AccountCircleOutlinedIcon className="icon" />

                  <Link to={`/user/${userId}/profil`} style={{ textDecoration: "none" }}>
                    <span>Profile</span>
                  </Link>
                </li>
                <Link to="/login" style={{ textDecoration: "none" }}>

          <li onClick={handleLogout} >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
            
         
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Usersidebar;
