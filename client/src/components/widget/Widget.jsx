import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom';


const Widget = ({ type ,countprojects,countuser,countdoc}) => {
  let data;
  //temporary
  const nbrojects = countprojects;
 const nbusers = countuser;
 const nbdoc = countdoc;
  switch (type) {
    case "projects":
      data = {
        to: "projects/addproject", 

        title: "PROJECTS",
        isMoney: true,
        link: "add new Project",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all Users",
        to: "/users", // Ajouter le lien vers la page Users

        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
      case "documents":
      data = {
        title: "DOCUMENTS",
        isMoney: true,
        link: "See all Documents",
        to: "/documents", // Ajouter le lien vers la page Documents

        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
        {data.isMoney ? nbrojects : nbusers}
  {data.title === "DOCUMENTS" && nbdoc}
          
        </span>
        <Link className="link" to={data.to}>{data.link}</Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          
          
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
