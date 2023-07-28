using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Interfaces
{
    public interface IUser
    {
         string Signup(BikeLoan bikeloan);
        string Login(login login);
        string addLoan(LoanRequestModel request);
        string addDocument(GetDocument document);
        string UpdateStatus(int loanid, string status);
        Loandetails getProfile();
        List<Document> getDocuments();
        List<Loandetails> viewLoan();
        
    }
}