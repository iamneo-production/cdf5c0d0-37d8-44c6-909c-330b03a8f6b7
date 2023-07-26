import React, { useState } from 'react';
import axios from 'axios';

const Adminapprovedloan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loanIdNotFound, setLoanIdNotFound] = useState(false);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);
  const [repaymentEnabled, setRepaymentEnabled] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    fetch(`https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/admin/getAllLoan?loanid=${searchQuery}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Loan ID not found');
        }
      })
      .then(loanData => {
        setLoanDetails(loanData);
        setLoanIdNotFound(false);
      })
      .catch(error => {
        setError(error);
        setLoanDetails(null);
        setLoanIdNotFound(true);
      });

    setSearchQuery(''); // Reset the search query
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleApproveLoan = (loanId) => {
    axios
      .post(`https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/user/viewLoan?loanid=${loanId}&status=approved`)
      .then(response => {
        // Handle the success response
        console.log(response.data);
        setApprovedLoans(prevApprovedLoans => [...prevApprovedLoans, loanId]);
        axios
          .get(`https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/admin/generateSchedules?loanid=${loanId}`)
          .then(res => {
            console.log(res.data);
            setRepaymentSchedule(res.data);
            setRepaymentEnabled(true);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        // Handle the error response
        console.log(error);
      });
  };

  const isLoanApproved = (loanId) => {
    return approvedLoans.includes(loanId);
  };

  return (
    <div className="approved-loan-container">
      <div className="search-bar1">
        <input id="Search"
          type="text"
          placeholder="Enter loan Id to search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {loanIdNotFound && <p className="found1">Loan ID not found</p>}
        {loanDetails && (
          <div className="loan-details1" key={loanDetails.loanId}>
            <div className="column2">
              <p>Applicant name: {loanDetails.applicantName}</p>
              <p>Applicant Address: {loanDetails.applicantAddress}</p>
              <p>Applicant Email: {loanDetails.applicantEmail}</p>
            </div>
            <div>
              <p>Applicant phone no: {loanDetails.applicantMobile}</p>
              <p>Applicant Loan Id: {loanDetails.loanId}</p>
              <p>Applicant Aadhar: {loanDetails.applicantAadhaar}</p>
            </div>
            <div>
              <p>Applicant PAN no: {loanDetails.applicantPan}</p>
              <p>Loan amount: {loanDetails.applicantSalary}</p>
            </div>
            <div className="button-container">
              <button
                className="approve-button"
                onClick={() => handleApproveLoan(loanDetails.loanId)}
                disabled={isLoanApproved(loanDetails.loanId)}
              >
                {isLoanApproved(loanDetails.loanId) ? 'Approved' : 'Approve for loan'}
              </button>
              {repaymentEnabled && (
                <button className="repayment-button" onClick={() => setRepaymentSchedule(loanDetails.loanId)}>
                  Repayment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {repaymentSchedule.length > 0 && (
        <div className="repayment-schedule">
          <h2>Repayment Schedule</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>EMI Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {repaymentSchedule.map(schedule => (
                <tr key={schedule.month}>
                  <td>{schedule.month}</td>
                  <td>{schedule.principal}</td>
                  <td>{schedule.interest}</td>
                  <td>{schedule.emIamount}</td>
                  <td>{schedule.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Adminapprovedloan;
