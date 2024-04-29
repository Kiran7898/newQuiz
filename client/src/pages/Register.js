import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import CSS file
import './register.css';
import background from "./bg.jpg";

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', data).then(res => alert(res.data));
  };

  return (
    <center>
    <div className="register-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={submitHandler} className="register-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={changeHandler}
              name="username"
              placeholder="User Name"
              required
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              onChange={changeHandler}
              name="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={changeHandler}
              name="confirmpassword"
              placeholder="Re-Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </center>
  );
};

export default Register;