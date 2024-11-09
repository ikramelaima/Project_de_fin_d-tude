import React, { useState } from "react";
import Usersidebar from "../../Usercomponents/usersidebar/Usersidebar";
import Usernavbar from "../../Usercomponents/usernavbar/Usernavbar";
import "./documents.scss";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Documentsuser = () => {
  const [description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const userId = localStorage.getItem("userId");

  const upload = () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("Date", Date);
    formData.append("file", file);
    formData.append("iduser",userId);
    axios.post('http://localhost:3001/create', formData)
      .then((response) => {
        console.log(response);
        if (response.data.Status === 'Success') {
          setMsg("File successfully uploaded");
        } else {
          setMsg("Error"+response.data.error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="tasks">
      <Usersidebar />
      <div className="tasksC">
        <Usernavbar />
        <center><h1>Upload your files</h1></center>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              aria-describedby="emailHelp"
          placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Date</label>
            <input
              type="Date"
              className="form-control"
              id="Date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="file" onChange={(e) => setFile(e.target.files[0])} />
            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
          </div>
          <button type="button" className="btn btn-primary" onClick={upload} style={{ marginTop: '20px' }}>
            Upload
          </button>
        {msg && <div style={{ fontSize: '15px', padding:'10px',borderRadius:'5px',margin:'10px 0',textAlign: 'center' ,backgroundColor:'green',color:'#fff' }}>{msg}</div>}
        </form>
      </div>
    </div>
  );
};

export default Documentsuser;