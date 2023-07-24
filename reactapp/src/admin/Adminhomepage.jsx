import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Adminhomepage() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get('https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/admin/getAllLoans')
      .then(res => {
        console.log(res.data); // Log the response to verify its structure
        setLoans(res.data); // Set the loan array
      })
      .catch(err => {
        console.log(err);
        // Handle the error
      });
  }, []);

  return (
    <div className="applied-loan-container">
      {loans.map(loan => (
        <div className="loan-card" key={loan.loanId}>
          <div className="column">
            <p>Applicant name: {loan.applicantName}</p>
            <p>Amount: {loan.applicantSalary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Adminhomepage;
