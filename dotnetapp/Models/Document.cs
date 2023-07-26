using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BikeLoan.Model
{
    public class Document
    {
        [Required, Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DocumentId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public byte[] DocumentUpload { get; set; }
    }
}
