import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const newUserOnclickHandler = () => {
    navigate("/");
  };

  const forgotPassHandler = () => {
    navigate("/forgot-password");
  };
  const [formData, setFormData] = useState({ email: "", password: "" });

  const emailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const passwordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onSubmitEventHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fetchData = await response.json();
    notify(fetchData.message);
    if (response.ok) {
      localStorage.setItem("token", fetchData.token);
      navigate("/profile");
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <form className="form-signup" onSubmit={onSubmitEventHandler}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <input
          value={formData.email}
          onChange={emailChange}
          className="form-signup-input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={formData.password}
          onChange={passwordChange}
          className="form-signup-input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="form-signup-button">Login</button>
        <div style={{ display: "flex" }}>
          <Link>
            <p onClick={newUserOnclickHandler}>New User ? Signup</p>
          </Link>
          <Link>
            <p style={{ marginLeft: "10rem" }} onClick={forgotPassHandler}>
              forgot password
            </p>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
