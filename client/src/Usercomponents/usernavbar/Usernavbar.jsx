import "./usernavbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import React, { useState } from "react";
import axios from "axios";


const Usernavbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");



  return (
    <div className="navbar1">
      <div className="wrapper">
        <div className="search">
         
        
       
          
        
        </div>
        <div className="items">
          
          <div className="item">
            
          </div>
          <div className="item">
            
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

export default Usernavbar;