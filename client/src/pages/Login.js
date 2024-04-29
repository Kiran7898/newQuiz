import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from '../App';
import { Navigate } from 'react-router';
import '../App.css';
import './login.css' // Import CSS file
import background from "./bg.jpg";

const Login = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/login', data)
      .then(res => setToken(res.data.token))
      .catch(err => alert("Please Enter Correct Details"));
  };

  if (token) {
    return <Navigate to='/home' />;
  }

  return (
    <center>
    <div className="login-container"style={{ backgroundImage: `url(${background})` }}>
      <div className="login-box" >
        <h2 className="login-title">Login</h2>
        
        <form onSubmit={submitHandler} className="login-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={changeHandler}
              name="email"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <div className="password-input">
              <input
                type="password"
                className="form-control"
                onChange={changeHandler}
                name="password"
                placeholder="Enter Password"
                required
              />
              <span className="password-toggle">
                <i className="fas fa-eye-slash"></i>
              </span>
            </div>
          </div>
          <div className="form-group">
            <button href="#" type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="form-group">
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
    </center>
  );
};

export default Login;