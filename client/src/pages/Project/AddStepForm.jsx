import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddStepForm.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddStepForm = () => {
 

  const { projectId } = useParams();

  const [values, setValues] = useState({
    nom: '',
    description: '',
   

  });
  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();

    axios.post(`http://localhost:3001/projects/${projectId}`, values)
    .then((res) => {
      console.log(res.data.id);
      navigate('/');
      console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="add-step-card">
      <h2>Add Step</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Name</label>
          <input
            type="text"
            id="nom"
            name="nom"
            onChange={(e) => setValues({ ...values, nom: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            required
          ></textarea>
        </div>
     
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStepForm;
