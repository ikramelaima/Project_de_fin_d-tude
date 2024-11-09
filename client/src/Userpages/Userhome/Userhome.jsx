import Usersidebar from "../../Usercomponents/usersidebar/Usersidebar";
import Usernavbar from "../../Usercomponents/usernavbar/Usernavbar";
import "./userhome.scss";
import Userwidget from "../../Usercomponents/Userwidget/Userwidget"
import axios from 'axios';
import React ,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Featureduser from '../../Usercomponents/Featureduser/Featureduser'
const Userhome = () => {
  const [taskData, setProjectData] = useState({});
  const [docData, setdocData] = useState({});
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    

    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get_task_count/${userId}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Failed to fetch project count:', error);
      }
    };
    const fetchdocData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get_doc_user/${userId}`);
        setdocData(response.data);
      } catch (error) {
        console.error('Failed to fetch project count:', error);
      }
    };

    //fetchUserData();
    fetchProjectData();
    fetchdocData();
  }, []);
 
    return (
      <div className="home">
        <Usersidebar />
        <div className="homeContainer">
          <Usernavbar /> 
          <div className="widgets">
          
          <Userwidget type="projects" countprojects={taskData.nb_tasks} />
      <Userwidget type="documents" countdoc={docData.nb_documents} />

        </div>
        <div className="featuser">
        <Featureduser id={userId}/>
        </div>
        

          </div>
          </div>
          );
        };
          export default Userhome;