import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GetDocument = () => {

  const navigate = useNavigate();

  const [documentUpload, setDoc] = useState([]);
  const [documentType, setDocType] = useState("aadhar");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setIsSuccess(false);
      setDoc(event.target.files[0]);
    }
  };

  const validateSelectedFile = () => {

    const MAX_FILE_SIZE = 2048;

    if (documentUpload.length <= 0) {
      setErrorMsg("Please choose a file");
      setIsSuccess(false);
      return;
    }
    const fileSize = documentUpload.size / 1024;
    if (fileSize > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than 2 mb");
      setIsSuccess(false);
      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    const fileExtension = documentUpload.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMsg('Please upload a valid image (jpg, jpeg, png) or document (pdf) file');
      setIsSuccess(false);
      return;
    }

    setErrorMsg("");
    setIsSuccess(true);
  }

  const addDocument = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('documentId', sessionStorage.getItem("loanId"));
    formData.append('documentType', documentType);
    formData.append('documentUpload', documentUpload);
    try {
      await axios.post("http://localhost:5041/user/addDocument", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => { console.log(response.data); })

      navigate("/user/loanApplied");
    } catch {
      if (!alert("Something went wrong"))
        navigate("/user/applyLoan");
    }

  }
  return (
    <div className="container col-md-7">
      <div className="form-control mt-4 px-5 bg-primary bg-opacity-10">
        <h1 className="text-center p-2 ">Document Details</h1>
        <form onSubmit={addDocument}>
          <div className="pb-3">
            <label htmlFor="upload-documents" className="fs-5 pb-1 fw-bold">Document type</label>
            <select
              onChange={(e) => { setDocType(e.target.value) }}
              name="file-type" id="upload-documents"
              className="form-control form-select">
              <option value="aadhar" >Aadhar</option>
              <option value="pan">PAN</option>
              <option value="drivers_license">Driver's License</option>
            </select>
          </div>
          <div className="pb-3">
            <label htmlFor="file-upload" className="fs-5 pb-1 fw-bold">Image or Document (Upload below 2MB)</label>
            <input
              id="file-upload"
              type='file'
              accept='image/*,.pdf'
              onChange={handleFileChange}
              className="form-control"
              required />
          </div>

          <div className="d-flex py-2 gap-3">
            <button type='button' onClick={validateSelectedFile} className="btn btn-primary">Upload Documents</button>

            {isSuccess ? <p className="success-message text-success fw-bold">Upload successful</p> : null}
            <p className="error-message text-danger fw-bold">{errorMsg}</p>
          </div>
          <div className="d-grid py-2">
            {isSuccess ? <button type='submit' className="btn btn-success">Add Documents</button> : null}
          </div>
        </form>
      </div>
    </div>
  )
}
