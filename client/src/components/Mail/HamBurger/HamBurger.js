import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HamBurger.css";

const HamBurger = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handler = () => {
    setIsOpen(!isOpen);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const sentHandler = () => {
    navigate("/sent");
  };

  const composeHandler = () => {
    navigate("/open-mail");
  };

  const inboxHandler = () => {
    navigate("/recieved-mail");
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={handler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <Link>
          <li onClick={composeHandler} className="link">
            Compose
          </li>
        </Link>
        <Link>
          <li onClick={inboxHandler} className="link">
            Inbox
          </li>
        </Link>
        <Link>
          <li onClick={sentHandler} className="link">
            Sent
          </li>
        </Link>
        <Link>
          <li onClick={logOutHandler} className="link">
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default HamBurger;
