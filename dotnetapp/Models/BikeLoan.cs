using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class BikeLoan
    {
          public string Email { get; set; }
        public string UserName { get; set; }
        public string MobileNumber { get; set; }
        public string UserRole { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
     public class login
    {
        public string Email { get; set; }
        public string Password { get; set; }


    }
}