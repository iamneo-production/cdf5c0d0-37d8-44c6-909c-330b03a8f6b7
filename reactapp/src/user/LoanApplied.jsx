import React from 'react'

export const LoanApplied = () => {
  return (
    <div className="container col-md-6">
      <div className="form-control mt-4 px-5 bg-primary bg-opacity-10">
        <h1 className="text-center p-2">Loan Applied Successfully</h1>
        <div className="text-center">
          <h2>Your Loan Id : {sessionStorage.getItem("loanId")}</h2>
        </div>
      </div>
    </div>
  )
}