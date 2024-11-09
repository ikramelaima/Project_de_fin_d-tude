import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function New() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    Name: '',
    email: '',
  });

  const navigate = useNavigate();

  const addUser = () => {
    setUsers([...users, newUser]);
    setNewUser({
      Name: '',
      email: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/add_users', { users })
      .then((res) => {
        navigate('/');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="project">
      <Sidebar />
      <div className="projectContainer">
        <Navbar />
        
        <form onSubmit={handleSubmit} className="form-container">
          {users.map((user, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={`Name_${index}`} className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id={`Name_${index}`}
                name={`Name_${index}`}
                value={user.Name}
                onChange={(e) => {
                  const updatedUsers = [...users];
                  updatedUsers[index].Name = e.target.value;
                  setUsers(updatedUsers);
                }}
                required
              />
              
              <label htmlFor={`email_${index}`} className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id={`email_${index}`}
                name={`email_${index}`}
                value={user.email}
                onChange={(e) => {
                  const updatedUsers = [...users];
                  updatedUsers[index].email = e.target.value;
                  setUsers(updatedUsers);
                }}
                required
              />
            </div>
          ))}
          
          <div className="mb-3">
            <button type="button" className="btn btn-primary" onClick={addUser}>
              Add User
            </button>
          </div>
          
          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              Save All Users
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;
