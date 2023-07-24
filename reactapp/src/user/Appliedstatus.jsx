import React, { useState } from 'react';

const Appliedstatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loanIdNotFound, setLoanIdNotFound] = useState(false);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

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
        setSearchQuery(''); // Reset the search query

        if (loanData.status === 'approved') {
          fetch(`https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/admin/generateSchedules?loanid=${loanData.loanId}`)
            .then(response => response.json())
            .then(scheduleData => {
              setRepaymentSchedule(scheduleData);
            })
            .catch(error => {
              console.log(error);
              // Handle the error and display an error message
            });
        }
      })
      .catch(error => {
        setError(error);
        setLoanDetails(null);
        setLoanIdNotFound(true);
        setSearchQuery(''); // Reset the search query
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const isLoanApproved = () => {
    return loanDetails?.status === 'approved';
  };

  return (
    <div className="approved-loan-container">
      <p className="track">Track Your Loan Application</p>
      {!loanDetails && (
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Your Loan Id"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="button-container1">
            <button className="search-button1" onClick={handleSearch}>
              Track
            </button>
          </div>
        </div>
      )}
      <div className="search-results">
        {loanIdNotFound && <p className="found">Loan ID not found</p>}
        {loanDetails && (
          <div className="loan-details" key={loanDetails.loanId}>
            <div className="column">
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
            <div className="status-container">
              {isLoanApproved() ? (
                <>
                  <p className="status">Approved</p>
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
                </>
              ) : (
                <p className="status1">Pending </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appliedstatus;
