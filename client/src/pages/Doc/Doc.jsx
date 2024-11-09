import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const Doc = () => {
  const [doc, setDoc] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchDocsAndUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const docsResponse = await axios.get(`http://localhost:3001/documents`);
        setDoc(docsResponse.data.tasks);

        const usersResponse = await axios.get('http://localhost:3001/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocsAndUsers();
  }, []);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const handleDownloadDocument = (documentId) => {
    window.open(`http://localhost:3001/documents/${documentId}/download`, '_blank');
  };

  const columns = [
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'responsable_nom', headerName: 'Responsible', width: 200 }, 
    { field: 'projet_nom', headerName: 'Project', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <button style={{ color: 'green' }}onClick={() => handleDownloadDocument(params.row.id)}>Download</button>
      ),
    },
  ];

  let messageContent;
  if (isLoading) {
    messageContent = <p style={{ color: 'blue' }}>Loading Document and users...</p>;
  } else if (error) {
    messageContent = <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {messageContent}
      <DataGrid
        rows={doc}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        checkboxSelection
        disableSelectionOnClick
        loading={isLoading}
      />
    </div>
  );
};

export default Doc;
