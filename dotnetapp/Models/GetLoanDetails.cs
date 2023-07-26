namespace BikeLoan.Model
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
        public double applicantSalary { get; set; }
        public double loanAmountRequired { get; set; }
        public int loanRepaymentMonths { get; set; }
    }
}
