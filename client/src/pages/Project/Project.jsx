import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import du composant Link
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import StepsTable from '../../components/StepsTable/StepsTable';
import './project.scss';
import AddStepForm from './AddStepForm';

const Project = () => {
  const [project, setProject] = useState({ id: '', nom: '', description: '' });
  const [steps, setSteps] = useState([]);
  const [showAddStepForm, setShowAddStepForm] = useState(false);
  const { projectId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/projects/${projectId}`)
      .then((response) => {
        console.log('Received project data:', response.data);
        setProject(response.data);
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
      });

    axios.get(`http://localhost:3001/projects/${projectId}/steps`)
      .then((response) => {
        console.log('Received steps data:', response.data);
        setSteps(response.data.steps);
      })
      .catch((err) => {
        console.error('Error fetching steps:', err);
      });
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const toggleAddStepForm = () => {
    setShowAddStepForm(!showAddStepForm);
  };

  return (
    <div className="project">
      <Sidebar />
      <div className="projectContainer">
        <Navbar />
        <div className="projectHeaderContainer">
          <div className="projectHeader">
            <h1>{project.nom}</h1>
            <p className="projectDescription">{project.description}</p>
          </div>
        </div>
        <button className="addStepButton" onClick={toggleAddStepForm}>Add Step</button>
        {showAddStepForm && <AddStepForm projectId={projectId} />}
        <div className="stepsContainer">
          {steps.map((step) => (
            <Link key={step.id} to={`${step.id}/Tache`} className="stepLink"> 
              <div className="stepCard">
                <h2 className="stepTitle">{step.nom}</h2>
                <h2 className="stepTitle">{step.id}</h2>

                <p className="stepDescription">{step.description}</p>
              </div>
            </Link>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Project;
