import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import StepsTable from "../../components/StepsTable/StepsTable"
import "./tache.scss"; 
import { useParams } from 'react-router-dom';

const Tache = () => {
  const { stepId } = useParams(); 
  const {projectId}=useParams()
  console.log(stepId);
  return (
    <div className="profil">
      <Sidebar />
      <div className="profilContainer">
        <Navbar />
        <StepsTable stepId={stepId} projectId={projectId}/> 
      </div>
    </div>
  );
}

export default Tache;
