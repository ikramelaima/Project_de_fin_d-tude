import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Datatable = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users'); 
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); 
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">
            <Link to={`/users/single/${params.row.id}`} className="link">
              View
            </Link>
            </div>
            <div className="deleteButton" onClick={(e) => handleDelete(params.row.id, e)}> 
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
