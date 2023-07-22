import "./SignUp.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const notify = (message) => toast(message);
  const navigate = useNavigate();

  const existingOnclickHandler = () => {
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confPass: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState("");
  const [signup, setsignup] = useState(false);

  useEffect(() => {
    if (password === confPass) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, confPass]);

  const emailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
    setFormData({ ...formData, password: e.target.value });
  };

  const conformPasswordChange = (e) => {
    setConfPass(e.target.value);
    setsignup(true);
    setFormData({ ...formData, confPass: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData)
    try{
        const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const fecthedResponse = await response.json();

    notify(fecthedResponse.message);

    setFormData({ email: "", password: "", confPass: "" });
    }catch(err){
        console.log(err)
    }
  };

  return (
    <form className="form-signup" onSubmit={onSubmitHandler}>
      <h1 className="form-signup-name">SignUp</h1>
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
      <input
        value={formData.confPass}
        onChange={conformPasswordChange}
        className={`form-signup-input ${
          isValid ? "isValidInput" : signup ? "notValidInput" : ""
        }`}
        type="password"
        name="confirm-password"
        placeholder="Confirm password"
        required
      />
      <button
        className={`form-signup-button ${isValid ? "isValid" : "notValid"}`}
      >
        Sign Up
      </button>
      <Link style={{ textAlign: "right" }}>
        <p onClick={existingOnclickHandler}>Existing user ? Login</p>
      </Link>
    </form>
  );
};

export default SignUp;