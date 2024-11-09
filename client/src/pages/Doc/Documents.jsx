import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Doc from './Doc'

const Profil = () => {
  return (
    <div className="profil">
      <Sidebar/>
      <div className="profilContainer">
        <Navbar/>
  <Doc/>
      </div>
    </div>
  )
}

export default Profil