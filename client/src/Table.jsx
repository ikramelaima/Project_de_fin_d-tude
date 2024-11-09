
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../src/pages/Taches/tache.scss";
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { dividerClasses } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const Table = ({ projectId, stepId }) => {
    const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    const fetchStepsData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get_steps_and_tasks_data?projectId=${projectId}&stepId=${stepId}`);
        setStepsData(response.data);
      } catch (error) {
        console.error('Failed to fetch steps and tasks data:', error);
      }
    };

    fetchStepsData();
  }, [projectId]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nom', headerName: 'Nom de l\'étape', width: 200 },
        { field: 'titre', headerName: 'Titre de la tâche', width: 200 },
        { field: 'description', headerName: 'Description de la tâche', width: 300 },
        { field: 'responsable_id', headerName: 'Responsable de la tâche', width: 200 },
        { field: 'statut', headerName: 'Statut de la tâche', width: 150 },
        { field: 'date_debut', headerName: 'Date de début', width: 150 },
        { field: 'date_fin', headerName: 'Date de fin', width: 150 },
        { field: 'priorite', headerName: 'Priorité', width: 150 },
      ];
    
  return (
    <div  style={{ height: 400, width: '100%' }}>
        <AgGridReact rows={stepsData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick/>
    </div>
  );
}

export default Table;

