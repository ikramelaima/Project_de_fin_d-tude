import "./newproject.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import React, { useState } from 'react';
import New from "../new/New";

import { Link, useNavigate } from 'react-router-dom';

function Newproject() {
  const [values, setValues] = useState({
    projectName: '',
    projectDescription: '',
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3001/addprojects', values)
      .then((res) => {
        navigate('/new');
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="project">
      <Sidebar />
      <div className="projectContainer">
        <Navbar />
        <div className="datatableTitle">
        Add New project
      </div>
        
        <form onSubmit={handleSubmit} className="form-container">
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              name="projectName"
              required
              onChange={(e) => setValues({ ...values, projectName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projectDescription" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="projectDescription"
              name="projectDescription"
              required
              onChange={(e) => setValues({ ...values, projectDescription: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newproject;