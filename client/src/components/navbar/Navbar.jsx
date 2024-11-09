import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");

  return (
    <div className="navbar1">
      <div className="wrapper">
        <div className="search"></div>
        <div className="items">
          <div className="item"></div>
          <div className="item"></div>

          <div className="item">
            <Link to="/projects/addproject" style={{ textDecoration: "none" }}>
              Add Project
            </Link>
          </div>

          <div className="item">
            <Link to="/profil" style={{ textDecoration: "none" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                alt=""
                className="avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;