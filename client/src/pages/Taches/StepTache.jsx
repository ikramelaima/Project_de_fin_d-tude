import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const StepsTable = ({  stepId }) => {
  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    const fetchStepsData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get_steps_and_tasks_data?&stepId=${stepId}`);
        setStepsData(response.data);
      } catch (error) {
        console.error('Failed to fetch steps and tasks data:', error);
      }
    };

    fetchStepsData();
  }, [ stepId]); 

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'titre', headerName: 'Titre de la tâche', width: 200 },
    { field: 'description', headerName: 'Description de la tâche', width: 300 },
    { field: 'responsable_id', headerName: 'Responsable de la tâche', width: 200 },
    { field: 'statut', headerName: 'Statut de la tâche', width: 150 },
    { field: 'date_debut', headerName: 'Date de début', width: 150 },
    { field: 'date_fin', headerName: 'Date de fin', width: 150 },
    { field: 'priorite', headerName: 'Priorité', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={stepsData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      
    </div>
  );}
export default StepsTable;
