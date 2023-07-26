namespace BikeLoan.Model
{
    public class GetDocument
    {
        public int DocumentId { get; set; }
        public string DocumentType { get; set; }
        public IFormFile DocumentUpload { get; set; }
    }
}
