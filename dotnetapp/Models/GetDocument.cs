using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace dotnetapp.Models
{
    public class GetDocument
    {
        public int DocumentId { get; set; }
        public string DocumentType { get; set; }
        public IFormFile DocumentUpload { get; set; }
    }
}