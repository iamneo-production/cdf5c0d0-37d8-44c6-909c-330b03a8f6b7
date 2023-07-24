using dotnetapp.Models;
using System.Collections.Generic;

namespace dotnetapp.Interface
{
    public interface Iloandetails
    {
        List<Loandetails> GetAllLoanDetails();
        Loandetails GetLoanDetailsById(int loanid);
        
        List<Repaymantdetails> generateSchedules(int loanid);
        List<Repaymantdetails> generateSchedule();
    }
}