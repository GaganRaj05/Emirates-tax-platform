import React, { useState } from "react";
import "./TaxUpload.css";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { uploadDocument } from "services/docs";
const TaxUpload = ({ onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('userId',localStorage.getItem('user_id'));
    formData.append('company_name', companyName);
    formData.append('designation', designation);
    formData.append('file', file);
    const response = await uploadDocument(formData);
    setIsLoading(false);
    if(response?.success ) {
      toast.success('Document uploaded successfully, We will get back to you soon');
      onClose();
    } 
    else {
      toast.error('An unknown network error has occured please try again in some time');
      return;
    }
  };

  return (
    <div className="overlay">
      <div className="popup fade-in" onDragEnter={handleDrag}>
        <h2>Upload Tax Document</h2>
        <form onSubmit={handleSubmit} onDragOver={handleDrag} onDrop={handleFileDrop}>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <label>Designation:</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />

          <label>Upload File (Drag & Drop):</label>
          <div
            className={`dropzone ${dragActive ? "active" : ""}`}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {file ? <p>{file.name}</p> : <p>Drag & drop file here or click to select</p>}
            <input
              id="fileInput"
              type="file"
              accept="*"
              onChange={handleFileChange}
              hidden
              required
            />

          </div>

          <div className="actions">
            <button type="submit">{isLoading ? <ClipLoader/>:'Submit'}</button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxUpload;
