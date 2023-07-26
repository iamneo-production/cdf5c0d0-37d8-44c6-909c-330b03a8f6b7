import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Adminappliedloan() {
  const [loan, setLoan] = useState(null);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [repaymentEnabled, setRepaymentEnabled] = useState(false);

  useEffect(() => {
    axios
      .get('https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/admin/getAllLoans')
      .then(res => {
        console.log(res.data);
        setLoan(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleApproveLoan = loanId => {
    axios
      .post(`https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/user/viewLoan?loanid=${loanId}&status=approved`)
      .then(response => {
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
        console.log(error);
      });
  };

  const isLoanApproved = loanId => {
    return approvedLoans.includes(loanId);
  };

  return (
    <div className="applied-loan-container">
      {loan && (
        <div className="loan-cards">
          {loan.map(item => (
            <div className="loan-card" key={item.loanId}>
              <div className="column1">
                <p>Applicant name: {item.applicantName}</p>
                <p>Applicant Address: {item.applicantAddress}</p>
                <p>Applicant Email: {item.applicantEmail}</p>
              </div>
              <div>
                <p>Applicant phone no: {item.applicantMobile}</p>
                <p>Applicant Loan Id: {item.loanId}</p>
                <p>Applicant Aadhar: {item.applicantAadhaar}</p>
              </div>
              <div>
                <p>Applicant PAN no: {item.applicantPan}</p>
                <p>Loan amount: {item.applicantSalary}</p>
              </div>
              <div className="button-container">
                <button
                  className="approve-button"
                  onClick={() => handleApproveLoan(item.loanId)}
                  disabled={isLoanApproved(item.loanId)}
                >
                  {isLoanApproved(item.loanId) ? 'Approved' : 'Approve for loan'}
                </button>
                {repaymentEnabled && (
                  <button className="repayment-button" onClick={() => setRepaymentSchedule(item.loanId)}>
                    Repayment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
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
}

export default Adminappliedloan;
