import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        navigate('/login');
      },1000); 
    }
  }, [showSuccess, navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors('');

    // Perform form validation
    // ...

    // If there are no errors, submit the form
    axios.post('https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/user/Signup', values)
      .then(res => {
        setShowSuccess(true);
      })
      .catch(err => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Register</strong>
      </div>
      <br/>
      <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
        <div className='p-1 rounded w-25 signupForm'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input
                type="text"
                id="admin/user"
                placeholder='Enter admin/user'
                name='userRole'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.userRole && <span className='text-danger'>{errors.userRole}</span>}
            </div>
            <div className='mb-3'>
              <input
                type="email"
                id="email"
                placeholder='Enter Email'
                name='email'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <input
                type="text"
                id="username"
                placeholder='Enter Username'
                name='username'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.username && <span className='text-danger'>{errors.username}</span>}
            </div>
            <div className='mb-3'>
              <input
                type="text"
                id="mobileNumber"
                placeholder='Enter Mobilenumber'
                name='mobileNumber'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.mobileNumber && <span className='text-danger'>{errors.mobileNumber}</span>}
            </div>
            <div className='mb-3'>
              <input
                type="password"
                id="password"
                placeholder='Password'
                name='password'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div className='mb-3'>
              <input
                type="password"
                id="confirmPassword"
                placeholder='Confirm Password'
                name='confirmPassword'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
            </div>
            <div>
              <div className='col'>
                <button type='submit' id="loginButton" className='btn btn-success w-100 rounded-0'> Submit</button>
              </div>
              <div className='d-flex justify-content-center'>
                <p>Already a user?</p>
              </div>
              <div className='d-flex justify-content-center'>
                <Link to='/login' type="button" id='signupLink' className="btn btn-primary rounded-0"> Login </Link>
              </div>
              <Outlet/>
            </div> 
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
