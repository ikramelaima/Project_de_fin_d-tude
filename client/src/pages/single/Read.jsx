import React, { useState, useEffect } from "react";
import "./single.scss";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function Read() {
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

  console.log("Data in state:", data); 


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="container-fluid vw-100 vh-100 bg-primary">
          <h1>User {id}</h1>
          <Link to="/" className="btn btn-success">
            Back
          </Link>
          {data.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <ul className="list-group">
              <li className="list-group-item">
                <b>ID: </b>
                {data.id}
              </li>
              <li className="list-group-item">
                <b>Name: </b>
                {data.nom}
              </li>
              <li className="list-group-item">
                <b>Email: </b>
                {data.email}
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default Read;
