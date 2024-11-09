import "./userwidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom';


const Widget = ({ type ,countprojects,countuser,countdoc}) => {
  let data;
  
  const nbrojects = countprojects;
 const nbusers = countuser;
 const nbdoc = countdoc;
  switch (type) {
    case "projects":
      data = {
        to: "/user/Tasks", 

        title: "TASKS",
        isMoney: true,
        link: "See all tasks",
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
   
      case "documents":
      data = {
        title: "DOCUMENTS",
        isMoney: true,
        link: "Send your documents",
        to: "/user/Documents", 

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