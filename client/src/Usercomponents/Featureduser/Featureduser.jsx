import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import './Featureduser.scss'
const Featureduser = ({ id }) => {
  const [tasksData, setTasksData] = useState([]);
  const [loadTasks, setLoadTasks] = useState(false);
  
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tasks/user/${id}`);
        setTasksData(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks data:', error);
      }
    };

    if (loadTasks) {
      fetchTasksData();
    }
  }, [id, loadTasks]);

  const totalTasks = tasksData.length;
  const completedTasks = tasksData.filter(task => task.statut === 'termine').length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleTasksClick = () => {
    setLoadTasks(!loadTasks);
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Task Progress</h1>
        <MoreVertIcon fontSize="small" onClick={handleTasksClick} />
      </div>
      <div className="bottom">
        {loadTasks && (
          <div className="featuredTask">
            <div className="featuredChart">
              <CircularProgressbar
                value={progress}
                text={`${Math.round(progress)}%`}
                strokeWidth={5}
              />
            </div>
            <p className="title">All Tasks</p>
            <div className="summary">
              <div className="item">
                <div className="itemTitle">Done</div>
                <div className="itemResult positive">
                  <div className="resultAmount">{completedTasks} tasks completed</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Not Done</div>
                <div className="itemResult negative">
                  <div className="resultAmount">{totalTasks - completedTasks} tasks not completed</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Featureduser;
