import React, { useState } from "react";
import "./Register.css";
import './Register.css';
import video from "../../LoginAssets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../LoginAssets/logo1.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    nom: '',
    email: '',
    mot_de_passe: ''
  });
  const navigate = useNavigate();
const [message,setMessage]=useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/register', values)
      .then(res => {
        if (res.data.Status === "Success") {
          setMessage("Signup Successfuly ")
          navigate('/login');
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="RegisterPage flex">
      <div className="contanier flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create your own project space</h2>
            <p>It's just the beginning</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Already have an account? </span>
            <Link to="/">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logoImage" />
            <h3>Welcome!</h3>
          </div>
          <form className="form grid" onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={values.nom}
                  onChange={(e) => setValues({ ...values, nom: e.target.value })}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdOutlineEmail className="icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={values.mot_de_passe}
                  onChange={(e) => setValues({ ...values, mot_de_passe: e.target.value })}
                  placeholder="Enter your password"
                />
              </div>
            </div>
       {message && <div style={{color: '#fff' , backgroundColor:'green',padding:'10px',borderRadius:'5px',margin:'10px'}} >{message}</div>} 
            <button type="submit" className="btn flex">
              <span>Sign up</span>
              <AiOutlineSwapRight className="icon" />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
