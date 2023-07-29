using dotnetapp.Interface;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using System;

namespace dotnetapp.Controllers
{
     [Route("[controller]")]
    [ApiController]
    public class adminController : ControllerBase
    {
        private Iloandetails _loandetails;

        public adminController( Iloandetails loandetails)
        {
            _loandetails = loandetails;
        }

        [HttpGet]
        [Route("getAllLoans")]
        public IActionResult GetAllLoanDetails()
        {
            try
            {
                List<Loandetails> loanDetails = _loandetails.GetAllLoanDetails();
                return Ok(loanDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

  

        [HttpGet("getAllLoan")]
        public IActionResult GetLoanDetailsById(int loanid)
        {
            try
            {
                var loan = _loandetails.GetLoanDetailsById(loanid);
                if (loan != null)
                {
                    return Ok(loan);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("generateSchedules")]
        public IActionResult generateSchedules(int loanid)
        {
            try
            {
                var loan = _loandetails.generateSchedules(loanid);
                if (loan != null)
                {
                    return Ok(loan);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      [HttpGet("generateSchedule")]
        public IActionResult generateSchedule()
        {
            try
            {
                var loan = _loandetails.generateSchedule();
                if (loan != null)
                {
                    return Ok(loan);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}