import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './StepsTable.css';
import { useNavigate } from "react-router-dom";

const StepsTable = ({ stepId }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    titre: '',
    description: '',
    responsable_id: '',
    statut: '',
    date_debut: '',
    date_fin: '',
    priorite: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const tasksResponse = await axios.get(`http://localhost:3001/tasks/${stepId}`);
        setTasks(tasksResponse.data.tasks);

        await fetchUsers();

      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasksAndUsers();
  }, [stepId]);

  const handleAddTask = async () => {
    try {
      if (!newTask.titre || !newTask.responsable_id) {
        throw new Error('Missing required fields: title and responsible');
      }
  
      setIsLoading(true);
  
      const formattedNewTask = {
        ...newTask,
        date_debut: newTask.date_debut ? new Date(newTask.date_debut).toISOString().split('T')[0] : null,
        date_fin: newTask.date_fin ? new Date(newTask.date_fin).toISOString().split('T')[0] : null
      };
  
      const response = await axios.post(`http://localhost:3001/tasks/${stepId}`, formattedNewTask);
      const addedTask = response.data;
  
      setTasks(prevTasks => [...prevTasks, addedTask]);
  
      setNewTask({
        titre: '',
        description: '',
        responsable_id: '',
        statut: '',
        date_debut: '',
        date_fin: '',
        priorite: ''
      });

      // Mettre à jour la liste des utilisateurs après l'ajout d'une tâche
      await fetchUsers();
    } catch (error) {
      console.error('Failed to add task:', error);
  
      if (error.message === 'Utilisateur responsable non trouvé') {
        setError('The responsible user was not found. Please select a valid user.');
      } else {
        setError('An error occurred while adding the task. Check server logs for details.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getRowId = (row) => row.id;

  const columns = [
    { field: 'titre', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'responsable_nom', headerName: 'Responsible', width: 200 },
    { field: 'statut', headerName: 'Status', width: 150, cellClassName: (params) => params.value === 'à_faire' ? 'red-status' : params.value === 'en_cours' ? 'blue-status' : 'green-status' },
    { field: 'date_debut', headerName: 'Start Date', width: 150, valueFormatter: (params) => formatDate(params.value) },
    { field: 'date_fin', headerName: 'End Date', width: 150, valueFormatter: (params) => formatDate(params.value) },
    { field: 'priorite', headerName: 'Priority', width: 150, cellClassName: (params) => params.value === 'faible' ? 'low-priority' : params.value === 'moyenne' ? 'medium-priority' : 'high-priority' },
  ];

  let messageContent;
  if (isLoading) {
    messageContent = <p>Loading tasks and users...</p>;
  } else if (error) {
    messageContent = <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {messageContent}
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        checkboxSelection
        disableSelectionOnClick
        loading={isLoading}
        getRowId={getRowId}
      />
      <div className="addTaskSection">
        <input type="text" name="titre" value={newTask.titre} onChange={handleChange} placeholder="Title" />
        <input type="text" name="description" value={newTask.description} onChange={handleChange} placeholder="Description" />
        <select name="responsable_id" value={newTask.responsable_id} onChange={handleChange}>
          <option value="">Select a manager</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.nom}</option> 
          ))}
        </select>
        <select name="statut" value={newTask.statut} onChange={handleChange} placeholder="Status"  >
          <option value="à_faire">To do</option>
          <option value="en_cours">In progress</option>
          <option value="termine">Done</option>
        </select>
        <input type="date" name="date_debut" value={newTask.date_debut} onChange={handleChange} />
        <input type="date" name="date_fin" value={newTask.date_fin} onChange={handleChange} />
        <select name="priorite" value={newTask.priorite} onChange={handleChange}>
          <option value="faible">Low</option>
          <option value="moyenne">Medium</option>
          <option value="elevee">High</option>
        </select>
        <button onClick={handleAddTask} disabled={isLoading}>
          Add
        </button>
      </div>
    </div>
  );
};

export default StepsTable;
