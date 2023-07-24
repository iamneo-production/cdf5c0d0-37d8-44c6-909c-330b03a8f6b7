import React from 'react';
import { useState, useEffect } from "react";

const Customerprofile = () => {
  
  const [profile, setProfile] = useState(null);
  
    useEffect(
        () => {
            fetch(`https://8080-babebfdaaddaacebcaffeabdcdceeeeaf.project.examly.io/user/getProfile`)
                .then(function (data) { return data.json() })
                .then(function (data) { setProfile(data) })
                .catch(e => {
                    console.log(e);
                    return e;
                })
        },[]
    )
  return (
    <div className="profile-container">
      <h1 className="heading">Profile Information</h1>
      <div className="profile-detaile">
      {
      (profile)?(<><div>
        
      <p>Name: {profile.applicantName} </p>
      <p>Email: {profile.applicantEmail}</p>
      <p>Address: {profile.applicantAadhaar}</p>
      </div><div>
      <p>Mobile No: {profile.applicantMobile}</p>
      <p>Loan ID: {profile.loanId}</p>
      <p>Monthly EMI: {profile.loanAmountRequired}</p>
 
      </div></>):(<div>Loading</div>)
      }
      </div>
      
    </div>
  );
}

export default Customerprofile;