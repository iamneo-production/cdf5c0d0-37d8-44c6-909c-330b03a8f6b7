import React from "react";
import { Route, Link, Routes } from 'react-router-dom';
import Adminapprovedloan from "./admin/Adminapprovedloan";
import Adminappliedloan from "./admin/Adminappliedloan";
import Adminhomepage from "./admin/Adminhomepage";

const AdminDashboard = () => {
  const handleLogout = {}
  return (
    <>
       <header>
        <h1>Bike Loan</h1> 
      <nav>
        <ul>
        <li>
              <Link to="admin/home">Home</Link>
            </li>
        <li>
              <Link to="admin/getAllLoan">Applied Loan</Link>
            </li>
          <li>
            <Link to="admin/getAllLoans">Loan Details</Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header> 
      <Routes>
        <Route exact path="admin/getAllLoans" element={<Adminapprovedloan/>} />
        <Route exact path="admin/getAllLoan" element={<Adminappliedloan />} />
        <Route exact path="admin/home" element={<Adminhomepage />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;
