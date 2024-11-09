
import Usersidebar from "../../Usercomponents/usersidebar/Usersidebar";
import Usernavbar from "../../Usercomponents/usernavbar/Usernavbar";
import "./notification.scss";


const Tasks = () => {
    return (
      <div className="tasks">
        <Usersidebar/>
        <div className="tasksC">
          <Usernavbar/>
          <h1>Notification</h1>
        </div>
        
      </div>
    )
  }
  
  export default Tasks ;