import React, { useState } from "react";
import './Login.css';
import video from '../../LoginAssets/video.mp4';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../LoginAssets/logo1.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import axios from 'axios';
import { useAuth } from "../../context/authContext";


function Login() {

  const [values, setValues] = useState({
    email: '',
    mot_de_passe: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/login', values, { withCredentials: true })
    .then(res => {
      const {role,userId}=res.data;
      localStorage.setItem("userId",userId);
      localStorage.setItem("token",res.data.token)
      if (res.data && res.data.role === 'admin') {
        navigate(`/`);

      } else if (res.data && res.data.role === 'user') {
        navigate(`/user/${res.data.userId}`);

      } else {
        alert("Error: Invalid email or password");
      }
     
      
    })
      .catch(err => {
        console.error("Login error:", err);
      });
  }

  return (
    <div className="loginPage flex">
      <div className="contanier flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create your own project space</h2>
            <p>It's just the beginning</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don't have an account ?</span>
            <Link to='/Register'>
              <button className="btn">Sign up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logoImage" />
            <h3>Welcome Back !</h3>
          </div>
          <form onSubmit={handleSubmit} className="form grid">
            <span className="showMessage">Login status will go here</span>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="email" id="email" placeholder="Enter your email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input type="password" id="password" placeholder="Enter your password"
                  value={values.mot_de_passe}
                  onChange={(e) => setValues({ ...values, mot_de_passe: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
