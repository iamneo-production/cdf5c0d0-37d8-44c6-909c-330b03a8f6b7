using dotnetapp.Interface;
using dotnetapp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System;
using System.Data;
using System.Data.SqlClient;
using static Npgsql.Replication.PgOutput.Messages.RelationMessage;
using System.Diagnostics.Metrics;
using System.Collections.Generic;

namespace dotnetapp.Services
{
   public class Loanservice : Iloandetails
    {
        private string _connstr;
        public Loanservice(string connstr)
        {
            //connstr = configuration.GetConnectionString("Dbconnection");az
            _connstr = connstr;
        }

        public List<Loandetails> GetAllLoanDetails()
        {
            List<Loandetails> loanList = new List<Loandetails>();

            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("SELECT * FROM Loandetails", connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var loan = new Loandetails
                        {
                            loanId = reader["loanId"] == DBNull.Value ? 0 : (int)reader["loanId"],
                            loantype = reader["loantype"] == DBNull.Value ? string.Empty : (string)reader["loantype"],
                            applicantName = reader["applicantName"] == DBNull.Value ? string.Empty : (string)reader["applicantName"],
                            applicantMobile = reader["applicantMobile"] == DBNull.Value ? string.Empty : (string)reader["applicantMobile"],
                            applicantEmail = reader["applicantEmail"] == DBNull.Value ? string.Empty : (string)reader["applicantEmail"],
                            applicantAadhaar = reader["applicantAadhaar"] == DBNull.Value ? string.Empty : (string)reader["applicantAadhaar"],
                            applicantPan = reader["applicantPan"] == DBNull.Value ? string.Empty : (string)reader["applicantPan"],
                            applicantSalary = reader["applicantSalary"] == DBNull.Value ? string.Empty : (string)reader["applicantSalary"],
                            loanAmountRequired = reader["loanAmountRequired"] == DBNull.Value ? string.Empty : (string)reader["loanAmountRequired"],
                            loanRepaymentMonths = reader["loanRepaymentMonths"] == DBNull.Value ? string.Empty : (string)reader["loanRepaymentMonths"],
                            applicantAddress = reader["applicantAddress"] == DBNull.Value ? string.Empty : (string)reader["applicantAddress"],
                            Status = reader["Status"] == DBNull.Value ? string.Empty : (string)reader["Status"]
                        };

                        loanList.Add(loan);
                    }
                }
            }

            return loanList;
        }
   

        public Loandetails GetLoanDetailsById(int loanid)
        {
            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("SELECT * FROM Loandetails WHERE loanId = @loanid", connection);
                command.Parameters.AddWithValue("@loanid", loanid);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        var loan = new Loandetails
                        {
                            loanId = reader["loanId"] == DBNull.Value ? 0 : (int)reader["loanId"],
                            loantype = reader["loantype"] == DBNull.Value ? string.Empty : (string)reader["loantype"],
                            applicantName = reader["applicantName"] == DBNull.Value ? string.Empty : (string)reader["applicantName"],
                            applicantMobile = reader["applicantMobile"] == DBNull.Value ? string.Empty : (string)reader["applicantMobile"],
                            applicantEmail = reader["applicantEmail"] == DBNull.Value ? string.Empty : (string)reader["applicantEmail"],
                            applicantAadhaar = reader["applicantAadhaar"] == DBNull.Value ? string.Empty : (string)reader["applicantAadhaar"],
                            applicantPan = reader["applicantPan"] == DBNull.Value ? string.Empty : (string)reader["applicantPan"],
                            applicantSalary = reader["applicantSalary"] == DBNull.Value ? string.Empty : (string)reader["applicantSalary"],
                            loanAmountRequired = reader["loanAmountRequired"] == DBNull.Value ? string.Empty : (string)reader["loanAmountRequired"],
                            loanRepaymentMonths = reader["loanRepaymentMonths"] == DBNull.Value ? string.Empty : (string)reader["loanRepaymentMonths"],
                            applicantAddress = reader["applicantAddress"] == DBNull.Value ? string.Empty : (string)reader["applicantAddress"],
                            Status = reader["Status"] == DBNull.Value ? string.Empty : (string)reader["Status"]
                        };

                        return loan;
                    }
                }
            }

            return null;
        }
         public List<Repaymantdetails> generateSchedule()
        {
            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("SELECT * FROM Loandetails", connection);


                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        var loan = new Loandetails
                        {
                            loanId = reader["loanId"] == DBNull.Value ? 0 : (int)reader["loanId"],
                            loantype = reader["loantype"] == DBNull.Value ? string.Empty : (string)reader["loantype"],
                            applicantName = reader["applicantName"] == DBNull.Value ? string.Empty : (string)reader["applicantName"],
                            applicantMobile = reader["applicantMobile"] == DBNull.Value ? string.Empty : (string)reader["applicantMobile"],
                            applicantEmail = reader["applicantEmail"] == DBNull.Value ? string.Empty : (string)reader["applicantEmail"],
                            applicantAadhaar = reader["applicantAadhaar"] == DBNull.Value ? string.Empty : (string)reader["applicantAadhaar"],
                            applicantPan = reader["applicantPan"] == DBNull.Value ? string.Empty : (string)reader["applicantPan"],
                            applicantSalary = reader["applicantSalary"] == DBNull.Value ? string.Empty : (string)reader["applicantSalary"],
                            loanAmountRequired = reader["loanAmountRequired"] == DBNull.Value ? string.Empty : (string)reader["loanAmountRequired"],
                            loanRepaymentMonths = reader["loanRepaymentMonths"] == DBNull.Value ? string.Empty : (string)reader["loanRepaymentMonths"],
                            applicantAddress = reader["applicantAddress"] == DBNull.Value ? string.Empty : (string)reader["applicantAddress"],
                            Status = reader["Status"] == DBNull.Value ? string.Empty : (string)reader["Status"]
                        };
                        double rate = 5;
                        double loanamount = Convert.ToDouble(loan.loanAmountRequired);
                        int months = 12;
                        months = Convert.ToInt32(loan.loanRepaymentMonths);

                        double interest;
                        double principal;

                        rate = (rate / 100) / 12;

                        double emi = (loanamount * rate * Math.Pow(1 + rate, months)) / (Math.Pow(1 + rate, months) - 1);
                        List<Repaymantdetails> schedules = new List<Repaymantdetails>();
                        for (int monthCounter = 1; monthCounter <= months; monthCounter++)
                        {
                            interest = loanamount * rate;

                            principal = emi - interest;
                            loanamount = loanamount - principal;

                            var schedule = new Repaymantdetails()
                            {
                                loanId = loan.loanId,
                                Month = monthCounter.ToString(),
                                interest = interest.ToString("N2"),
                                principal = principal.ToString("N2"),
                                EMIamount = emi.ToString("N2"),
                                Balance = loanamount.ToString("N2"),
                            };
                            schedules.Add(schedule);
                        }

                        return schedules;

                    }
                }
            }

            return null;
        }

        public List<Repaymantdetails> generateSchedules(int loanid)
        {
            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("SELECT * FROM Loandetails WHERE loanId = @loanid", connection);
                command.Parameters.AddWithValue("@loanid", loanid);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        var loan = new Loandetails
                        {
                            loanId = reader["loanId"] == DBNull.Value ? 0 : (int)reader["loanId"],
                            loantype = reader["loantype"] == DBNull.Value ? string.Empty : (string)reader["loantype"],
                            applicantName = reader["applicantName"] == DBNull.Value ? string.Empty : (string)reader["applicantName"],
                            applicantMobile = reader["applicantMobile"] == DBNull.Value ? string.Empty : (string)reader["applicantMobile"],
                            applicantEmail = reader["applicantEmail"] == DBNull.Value ? string.Empty : (string)reader["applicantEmail"],
                            applicantAadhaar = reader["applicantAadhaar"] == DBNull.Value ? string.Empty : (string)reader["applicantAadhaar"],
                            applicantPan = reader["applicantPan"] == DBNull.Value ? string.Empty : (string)reader["applicantPan"],
                            applicantSalary = reader["applicantSalary"] == DBNull.Value ? string.Empty : (string)reader["applicantSalary"],
                            loanAmountRequired = reader["loanAmountRequired"] == DBNull.Value ? string.Empty : (string)reader["loanAmountRequired"],
                            loanRepaymentMonths = reader["loanRepaymentMonths"] == DBNull.Value ? string.Empty : (string)reader["loanRepaymentMonths"],
                            applicantAddress = reader["applicantAddress"] == DBNull.Value ? string.Empty : (string)reader["applicantAddress"],
                            Status = reader["Status"] == DBNull.Value ? string.Empty : (string)reader["Status"]
                        };
                        double rate = 5;
                        double loanamount = Convert.ToDouble(loan.loanAmountRequired);
                        int months = 12;
                        months = Convert.ToInt32(loan.loanRepaymentMonths);

                        double interest;
                        double principal;

                        rate = (rate / 100) / 12;

                        double emi = (loanamount * rate * Math.Pow(1 + rate, months)) / (Math.Pow(1 + rate, months) - 1);
                        List<Repaymantdetails> schedules = new List<Repaymantdetails>();
                        for (int monthCounter = 1; monthCounter <= months; monthCounter++)
                        {
                            interest = loanamount * rate;

                            principal = emi - interest;
                            loanamount = loanamount - principal;

                            var schedule = new Repaymantdetails()
                            {
                                loanId = loan.loanId,
                                Month = monthCounter.ToString(),
                                interest = interest.ToString("N2"),
                                principal = principal.ToString("N2"),
                                EMIamount = emi.ToString("N2"),
                                Balance = loanamount.ToString("N2"),
                            };
                            schedules.Add(schedule);
                        }

                        return schedules;
                        
                    }
                }
            }

            return null;
        }


    }
}