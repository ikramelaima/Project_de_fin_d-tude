import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [docData, setdocData] = useState({});


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get_user_count');
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    const fetchProjectData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get_projects_count');
        setProjectData(response.data);
      } catch (error) {
        console.error('Failed to fetch project count:', error);
      }
    };
    const fetchdocData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get_doc_count');
        setdocData(response.data);
      } catch (error) {
        console.error('Failed to fetch project count:', error);
      }
    };

    fetchUserData();
    fetchProjectData();
    fetchdocData();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          
          <Widget type="projects" countprojects={projectData.nb_projects} />
      <Widget type="users" countuser={userData.nb_users} />
      <Widget type="documents" countdoc={docData.nb_documents} />

          
        </div>
        <div className="charts">
          <Featured />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
