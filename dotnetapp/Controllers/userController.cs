using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using dotnetapp.Interfaces;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private IUser _iuser;

        public userController(IUser iuser)
        {
            _iuser = iuser;
        }
       [HttpPost]
      [Route("signup")]
    public IActionResult Signup(BikeLoan bikeloan)
   {
    try
       {
        var result = _iuser.Signup(bikeloan);
        return CreatedAtAction(nameof(Signup), result);
       }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
   }

        [HttpPost]
        [Route("login")]
        public string Login(login login)
        {
            try
            {
                var result = _iuser.Login(login);
                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost]
        [Route("addLoan")]
        public string addLoan([FromBody] LoanRequestModel request)
        {
            try
            {
                //int loanId = request.LoanId;
                //GetLoanDetails loanDetails = request.LoanDetails;
                var result = _iuser.addLoan(request);
                return result;;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        [Route("getDocuments")]
        public string addDocument([FromForm] GetDocument document)
        {
            try
            {
                //int loanId = request.LoanId;
                //GetLoanDetails loanDetails = request.LoanDetails;
                var result = _iuser.addDocument(document);
                return result; ;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
         [HttpGet]
        [Route("getDocuments")]
        public IActionResult getDocuments()
        {
            try
            {
                List<Models.Document> documentdetails = _iuser.getDocuments();
                return Ok(documentdetails);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("viewLoan")]
        public IActionResult viewLoan()
        {
            try
            {
                List<Models.Loandetails> documentdetails = _iuser.viewLoan();
                return Ok(documentdetails);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("getProfile")]
        public IActionResult GetAllLoanDetails()
        {
            try
            {
                var loandetails = _iuser.getProfile();
                return Ok(loandetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("viewLoan")]
        public string UpdateStatus(int loanid, string status)
        {
            try
            {

                var result = _iuser.UpdateStatus(loanid, status);
                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}