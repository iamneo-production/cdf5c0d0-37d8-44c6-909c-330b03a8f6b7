import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup/Signup";
import Login from './Login/Login';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup/Signup.css';
import './Login/Login.css';
import './App.css';

const App = () => {
  return (
    <Router>
      
      <Routes>
       
        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin*" element={<AdminDashboard />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
