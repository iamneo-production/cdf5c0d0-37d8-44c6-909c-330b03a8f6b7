import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Customerprofile from './user/Customerprofile';
import Appliedstatus from "./user/Appliedstatus";
import { ApplyLoan } from "./user/ApplyLoan";
import { GetDocument } from "./user/GetDocument";
import { LoanApplied } from "./user/LoanApplied";

const Dashboard = () => {
  const handleLogout=() => {
    console.log("Log out");
  }
  return (
    <>
      <header>
        <h1>Bike Loan</h1>
        <nav>
          <ul>
            <li>
              <Link to="/user/applyLoan">Apply Loan</Link>
            </li>
            <li>
              <Link to="/user/viewLoan">Loan Status</Link>
            </li>
            <li>
              <Link to="/user/getProfile">Profile</Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <Routes>
        <Route exact path="/user/getProfile" element={<Customerprofile />} />
        <Route exact path="/user/viewLoan" element={<Appliedstatus />} />
        <Route path="/user/applyLoan" element={<ApplyLoan />} />
        <Route path="/user/getDocument" element={<GetDocument />} />
        <Route path="/user/loanApplied" element={<LoanApplied />} />
      </Routes>
    </>
  );
};

export default Dashboard;
