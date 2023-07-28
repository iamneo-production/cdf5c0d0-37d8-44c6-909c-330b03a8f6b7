﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Document
    {
        //[Required, Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DocumentId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public byte[] DocumentUpload { get; set; }
    }
}
