import { useState } from "react";
import { Link } from "react-router-dom";
import "./HamBurger.css";

const HamBurger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={handler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <Link >
          <li className="link">Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default HamBurger;
