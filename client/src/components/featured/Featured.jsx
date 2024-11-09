import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Link } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import './featured.scss'

const Featured = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadProjects, setLoadProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get_projects_and_tasks_data');
        console.log('Projects data from server:', response.data);
        setProjectsData(response.data);
      } catch (error) {
        console.error('Failed to fetch projects data:', error);
      }
    };
  
    fetchProjectsData();
  }, []);
  

  useEffect(() => {
    if (loadProjects) {
      axios
        .get('http://localhost:3001/projects')
        .then((response) => setProjects(response.data))
        .catch((error) => console.error('Erreur lors de la récupération des projets :', error));
    }
  }, [loadProjects]);

  const handleProjectsClick = () => {
    setLoadProjects(!loadProjects);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Project Progress</h1>
        <MoreVertIcon fontSize="small" onClick={handleProjectsClick} />
        {loadProjects && (
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.id} className="project-item" onClick={() => handleProjectSelect(project.id)}>
                <FolderIcon className="icon" />
                <span>{project.nom}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bottom">
        {projectsData.map((project) => (
          <div key={project.id} className="featuredProject">
            {(selectedProject === project.id) && (
              <>
                <div className="featuredChart">
                  <CircularProgressbar
                    value={(project.tasks_completed / project.total_tasks) * 100}
                    text={`${Math.round((project.tasks_completed / project.total_tasks) * 100)}%`}
                    strokeWidth={5}
                  />
                </div>
                <p className="title">{project.nom}</p>
                <p className="desc">{project.description}</p>
                <div className="summary">
                  <div className="item">
                    <div className="itemTitle">Done</div>
                    <div className="itemResult negative">
                      <KeyboardArrowDownIcon fontSize="small" />
                      <div className="resultAmount">
                        {project.total_tasks - project.tasks_completed} tasks not done
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="itemTitle">Not Done</div>
                    <div className="itemResult positive">
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                      <div className="resultAmount">{project.tasks_completed} tasks done</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
