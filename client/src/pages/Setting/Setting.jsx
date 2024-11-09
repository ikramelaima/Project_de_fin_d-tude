import "./setting.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const Project = () => {
  return (
    <div className="set">
      <Sidebar/>
      <div className="setContainer">
        <Navbar/>
        <h1>Page de setting</h1>
      </div>
    </div>
  )
}

export default Project