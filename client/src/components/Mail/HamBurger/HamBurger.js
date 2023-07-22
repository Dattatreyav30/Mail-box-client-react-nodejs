import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HamBurger.css";

const HamBurger = () => {
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handler = () => {
    setIsOpen(!isOpen);
  };

const logOutHandler = () =>{
    localStorage.removeItem("token");
    navigate('/login')
}
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={handler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <Link>
          <li onClick={logOutHandler} className="link">Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default HamBurger;
