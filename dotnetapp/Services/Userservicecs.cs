using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Interfaces;
using dotnetapp.Models;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using System.IO;
namespace dotnetapp.Services
{
    public class Userservicecs : IUser
    {
        private string _connstr;

        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        public Userservicecs(string connstr)
        {
            //connstr = configuration.GetConnectionString("Dbconnection");az
            _connstr = connstr;
        }
        public string addLoan(LoanRequestModel request)
        {
            string msg = string.Empty;
            try
            {
                using (var connection = new SqlConnection(_connstr))
                {
                    var query = @"INSERT INTO Loandetails (loanId, loantype, applicantName, applicantAddress, applicantMobile, applicantEmail, applicantAadhaar, applicantPan, applicantSalary, loanAmountRequired, loanRepaymentMonths) 
                          VALUES (@loanId, @loantype, @applicantName, @applicantAddress, @applicantMobile, @applicantEmail, @applicantAadhaar, @applicantPan, @applicantSalary, @loanAmountRequired, @loanRepaymentMonths)";

                    var parameters = new
                    {
                        request.LoanId,
                        request.LoanDetails.loantype,
                        request.LoanDetails.applicantName,
                        request.LoanDetails.applicantAddress,
                        request.LoanDetails.applicantMobile,
                        request.LoanDetails.applicantEmail,
                        request.LoanDetails.applicantAadhaar,
                        request.LoanDetails.applicantPan,
                        request.LoanDetails.applicantSalary,
                        request.LoanDetails.loanAmountRequired,
                        request.LoanDetails.loanRepaymentMonths
                    };

                    var affectedRows = connection.Execute(query, parameters);

                    if (affectedRows > 0)
                    {
                        msg = "Data inserted successfully";
                    }
                    else
                    {
                        msg = "Error inserting data";
                    }
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        public string addDocument(GetDocument document)
        {
            string msg = string.Empty;
            try
            {
                using (var connection = new SqlConnection(_connstr))
                {
                    // Convert IFormFile to byte[]
                    byte[] fileBytes;
                    using (var memoryStream = new MemoryStream())
                    {
                        document.DocumentUpload.CopyTo(memoryStream);
                        fileBytes = memoryStream.ToArray();
                    }

                    var query = @" INSERT INTO NewDocument (DocumentType, DocumentUpload, DocumentName)
              VALUES (@DocumentType, @DocumentUpload, @DocumentName)";


                    var parameters = new DynamicParameters();
                    parameters.Add("@DocumentType", document.DocumentType);
                    parameters.Add("@DocumentUpload", fileBytes);
                    parameters.Add("@DocumentName", document.DocumentUpload.FileName);

                    var affectedRows = connection.Execute(query, parameters);

                    if (affectedRows > 0)
                    {
                        msg = "Data inserted successfully";
                    }
                    else
                    {
                        msg = "Error inserting data";
                    }
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
        public Loandetails getProfile()
        {
            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("select * from Loandetails order by 1 desc ", connection);

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
        public Userdetails getUserdetails(string email, string password)
        {
            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("SELECT userRole FROM Userdetails WHERE email = @email AND password = @password", connection);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Userdetails
                        {
                         userRole = reader.GetString(reader.GetOrdinal("userRole"))
                        };
                    }
                }
            }

            return null;
        }

        public string UpdateStatus(int loanId, string status)
        {
            string msg = string.Empty;

            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var updateQuery = "UPDATE loandetails SET Status = @status WHERE loanid = @loanId";

                using (SqlCommand updateCommand = new SqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@status", status);
                    updateCommand.Parameters.AddWithValue("@loanId", loanId);

                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    connection.Close();

                    if (rowsAffected > 0)
                    {
                        msg = "Data Updated";
                    }
                    else
                    {
                        msg = "No rows affected";
                    }
                }
            }

            return msg;
        }
        public string Signup(BikeLoan bikeloan)
        {
            string msg = string.Empty;
            try
            {
                var connection = new SqlConnection(_connstr);
                cmd = new SqlCommand("usp_SignUp", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", bikeloan.Email);
                cmd.Parameters.AddWithValue("@userName", bikeloan.UserName);
                cmd.Parameters.AddWithValue("@mobilenumber", bikeloan.MobileNumber);
                cmd.Parameters.AddWithValue("@userRole", bikeloan.UserRole);

                cmd.Parameters.AddWithValue("@password", bikeloan.Password);
                cmd.Parameters.AddWithValue("@conformPassword", bikeloan.ConfirmPassword);
                connection.Open();
                int i = cmd.ExecuteNonQuery();
                connection.Close();
                if (i > 0)
                {
                    msg = "data inserted";
                }
                else
                {
                    msg = "error";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
 public string Login(login login)
{
    string msg = string.Empty;
    try
    {
        var connection = new SqlConnection(_connstr);
        connection.Open();
        var command = new SqlCommand("SELECT COUNT(*) FROM Userdetails WHERE email = @email AND password = @password", connection);
        command.Parameters.AddWithValue("@email", login.Email);
        command.Parameters.AddWithValue("@password", login.Password);

        int count = (int)command.ExecuteScalar();

        if (count > 0)
        {
            msg = "User is valid.";
        }
        else
        {
            msg = "User is invalid. Please check your email and password.";
        }

        connection.Close();
    }
    catch (Exception ex)
    {
        msg = ex.Message;
    }
    return msg;
}

        public List<Document> getDocuments()
        {
            List<Document> DocumentList = new List<Document>();

            using (var connection = new SqlConnection(_connstr))
            {
                connection.Open();

                var command = new SqlCommand("SELECT * FROM NewDocument", connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var documentdetails = new Document
                        {
                            DocumentId = reader["DocumentId"] == DBNull.Value ? 0 : (int)reader["DocumentId"],
                            DocumentType = reader["DocumentType"] == DBNull.Value ? string.Empty : (string)reader["DocumentType"],
                            DocumentName = reader["DocumentName"] == DBNull.Value ? string.Empty : (string)reader["DocumentName"]
                            
                         
                        };

                        DocumentList.Add(documentdetails);
                    }
                }
            }

            return DocumentList;
        }

        public List<Loandetails> viewLoan()
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


    }
}