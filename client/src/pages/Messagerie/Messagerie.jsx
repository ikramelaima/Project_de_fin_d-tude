import "./messagerie.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const Messagerie = () => {
  return (
    <div className="mess">
      <Sidebar/>
      <div className="messContainer">
        <Navbar/>
        <h1>Page de messagerie</h1>
      </div>
    </div>
  )
}

export default Messagerie