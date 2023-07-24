import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ApplyLoan = () => {
 
  const navigate = useNavigate();

  const [loantype, setLoanType] = useState("");
  const [applicantName, setName] = useState("");
  const [applicantAddress, setAddress] = useState("");
  const [applicantMobile, setMobile] = useState("");
  const [applicantEmail, setEmail] = useState("");
  const [applicantAadhaar, setAadhaar] = useState("");
  const [applicantPan, setPan] = useState("");
  const [applicantSalary, setSalary] = useState("");
  const [loanAmountRequired, setAmount] = useState("");
  const [loanRepaymentMonths, setMonth] = useState("");
  const [lastGeneratedLoanId, setLastGeneratedLoanId] = useState(9999);
 
  useEffect(() => {
    const lastId = parseInt(localStorage.getItem("lastGeneratedLoanId"));
    if (!isNaN(lastId)) {
      setLastGeneratedLoanId(lastId);
    }
  }, []);

  const addLoan = (event) => {
    event.preventDefault();
    const newLoanId = lastGeneratedLoanId + 1;
  
  let loanDetails = {
    loantype,
    applicantName,
    applicantAddress,
    applicantMobile,
    applicantEmail,
    applicantAadhaar,
    applicantPan,
    applicantSalary,
    loanAmountRequired,
    loanRepaymentMonths
  };
 // const loanId = generateLoanId();

    try {
      // Call the API with loanId and loanDetails
       axios.post("https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/user/addLoan", { loanId:newLoanId, loanDetails });

      // Store the new loan ID in local storage
      localStorage.setItem("lastGeneratedLoanId", newLoanId.toString());

      // Store loanId and loanDetails in session storage
      sessionStorage.setItem("loanId", newLoanId);
      sessionStorage.setItem("loanDetails", JSON.stringify(loanDetails));

      navigate("/user/getDocument");
    } catch (error) {
      console.error("Error adding loan:", error);
      alert("Something went wrong, please try again.");
    }
  };

  // const generateLoanId = () => {
  //   return Math.floor(Math.random() * 1000);
  // };


// const loanId = generateLoanId();
//   const addLoan = async (event) => {
//     sessionStorage.setItem("ApplyLoanBtn", true)
//     event.preventDefault();

    
    // try {
    //   await axios.post("http://localhost:5120/User/addLoan", loanDetails)
    //     .then((response) => { sessionStorage.setItem("loanId", response.data) });

    //   console.log(sessionStorage.getItem("loanId"));
    //   navigate("/user/getDocument");
    // }
    // catch {
    //   alert("Something went wrong, Please try again")
    // }
 // }
  return (
    <div className="container col-md-7">
      <div className="form-control mt-4 mb-4 px-5 bg-primary bg-opacity-10">
        <h1 className="text-center p-2 ">Loan Details</h1>
        <form onSubmit={addLoan}>
          <div className="pb-3">
            <label htmlFor='loanType' className="fs-5 pb-1 fw-bold">Enter Your Loan Type</label>
            <input
              id='loanType'
              type='text'
              placeholder="Enter Loan Type"
              value={loantype}
              onChange={(e) => setLoanType(e.target.value)}
              className="form-control"
              required />
          </div>
          <div className="pb-3">
            <label htmlFor="customerName" className="fs-5 pb-1 fw-bold">Enter Your Name</label>
            <input
              id='customerName'
              type='text'
              placeholder="Enter Name"
              value={applicantName}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required />
          </div>
          <div className="pb-3">
            <label htmlFor="applicantAddress" className="fs-5 pb-1 fw-bold">Enter Your Address</label>
            <input
              id='applicantAddress'
              type='text'
              placeholder="Enter Address"
              value={applicantAddress}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              required />
          </div>
          <div className="pb-3">
            <label htmlFor="applicantMobile" className="fs-5 pb-1 fw-bold">Enter Your Mobile Number</label>
            <input
              id='applicantMobile'
              placeholder="Enter Mobile"
              value={applicantMobile}
              onChange={(e) => setMobile(e.target.value)}
              className="form-control"
              type='text' required />
          </div>
          <div className="pb-3">
            <label htmlFor="applicantEmail" className="fs-5 pb-1 fw-bold">Enter Your Email</label>
            <input
              id='applicantEmail'
              placeholder="Enter Email Id"
              value={applicantEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type='email' required />
          </div>
          <div className="pb-3">
            <label htmlFor="aadharNumber" className="fs-5 pb-1 fw-bold">Enter Your Aadhaar Number</label>
            <input
              id='aadharNumber'
              type='text'
              placeholder="Enter Aadhaar Number"
              value={applicantAadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="form-control"
              required />
          </div>
          <div className="pb-3">
            <label htmlFor="PANCardNumber" className="fs-5 pb-1 fw-bold">Enter Your PAN</label>
            <input
              id='PANCardNumber'
              placeholder="Enter PAN Card Number"
              value={applicantPan}
              onChange={(e) => setPan(e.target.value)}
              className="form-control"
              type='text' required />
          </div>
          <div className="pb-3">
            <label htmlFor="applicantSalary" className="fs-5 pb-1 fw-bold">Enter Your Salary</label>
            <input
              id='applicantSalary'
              placeholder="Enter Salary"
              value={applicantSalary}
              onChange={(e) => setSalary(e.target.value)}
              className="form-control"
              type='number' min="1" required />
          </div>
          <div className="pb-3">
            <label htmlFor="amount" className="fs-5 pb-1 fw-bold">Enter Loan Amount Required</label>
            <input
              id='amount'
              placeholder="Enter Loan Amount Required"
              value={loanAmountRequired}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              type='number' min="1" required />
          </div>
          <div className="pb-3">
            <label htmlFor="dueMonths" className="fs-5 pb-1 fw-bold">Enter Loan Repayment Months</label>
            <input
              id='dueMonths'
              placeholder="Enter Loan Repayment Months"
              value={loanRepaymentMonths}
              onChange={(e) => setMonth(e.target.value)}
              className="form-control"
              type='number' min="1" required />
          </div>
          <div className="d-grid gap-2 py-2">
            <button type="submit" className="submitFormButton btn btn-primary">Next</button>
          </div>
        </form>
      </div>
    </div>
  )
}
