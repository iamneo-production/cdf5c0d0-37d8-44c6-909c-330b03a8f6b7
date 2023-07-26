using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Repaymantdetails
    {
        public int loanId { get; set; }
        public string Month { get; set; }
        public string principal { get; set; }
        public string interest { get; set; }
        public string EMIamount { get; set; }
        public string Balance { get; set; }
    }
}