import "./Noti.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const Noti = () => {
  return (
    <div className="noti">
      <Sidebar/>
      <div className="notiContainer">
        <Navbar/>
        <h1>Page de Notification</h1>
      </div>
    </div>
  )
}

export default Noti