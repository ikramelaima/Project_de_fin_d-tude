import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Single = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get_user/${id}`);
        setData(response.data);
        console.log("Data from server:", response.data); 
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to="/" className="editButto">
            Back
          </Link>
            <h1 className="title">Information</h1>
            <div className="item">
            {data.length === 0 ? (
            <p>Loading...</p>
          ) : (
              <div className="details">
                <h1 className="itemTitle"> {data.nom}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue"> {data.email}</span>
                </div>
               
                
              
              </div>
              )}
            </div>
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default Single;
