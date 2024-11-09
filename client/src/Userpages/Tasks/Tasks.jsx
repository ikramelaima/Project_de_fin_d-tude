import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Usersidebar from "../../Usercomponents/usersidebar/Usersidebar";
import Usernavbar from "../../Usercomponents/usernavbar/Usernavbar";
import "./tasks.scss";
import { useParams } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:3001/get_taches/${userId}`)
      .then(response => {
        setTasks(response.data);
        console.log(userId);
      })
      .catch(error => {
        console.error('Error fetching taches:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.titre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasks, searchQuery]);

  const getColorByPriority = (priority) => {
    switch (priority.toLowerCase()) {
      case 'faible':
        return 'blue';
      case 'moyenne':
        return 'orange';
      case 'elevee':
        return 'red';
      default:
        return 'black';
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    axios.put(`http://localhost:3001/update_task_status/${taskId}`, { statut: newStatus })
      .then(response => {
        console.log(response.data);
        setTasks(prevTasks => {
          return prevTasks.map(task => {
            if (task.id === taskId) {
              return { ...task, statut: newStatus };
            } else {
              return task;
            }
          });
        });
      })
      .catch(error => {
        console.error('Error updating task status:', error);
      });
  };

  return (
    <div className="tasks">
      <Usersidebar />
      <div className="tasksC">
        <Usernavbar />
        <div>
          <h2>Taches List</h2>
          <div className="search">
          <input type="text" placeholder="Search..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
         
        </div>    
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Priorité</th>
                <th>Date début</th>
                <th>Date fin</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.titre}</td>
                  <td>{task.description}</td>
                  <td>
                    <select value={task.statut} onChange={e => handleStatusChange(task.id, e.target.value)}>
                      <option value="en_cours">En progress</option>
                      <option value="termine">done</option>
                    </select>
                  </td>
                  <td style={{ color: getColorByPriority(task.priorite) }}>{task.priorite}</td>
                  <td>{task.date_debut}</td>
                  <td>{task.date_fin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;