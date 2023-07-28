﻿﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class GetLoanDetails
    {
        public string loantype { get; set; }
        public string applicantName { get; set; }
        public string applicantAddress { get; set; }
        public string applicantMobile { get; set; }
        public string applicantEmail { get; set; }
        public string applicantAadhaar { get; set; }
        public string applicantPan { get; set; }
        public string applicantSalary { get; set; }
        public string loanAmountRequired { get; set; }
        public string loanRepaymentMonths { get; set; }
    }
    public class LoanRequestModel
    {
        public int LoanId { get; set; }
        public GetLoanDetails LoanDetails { get; set; }
    }
}