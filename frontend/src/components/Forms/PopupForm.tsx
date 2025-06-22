import React, { useState, useEffect } from 'react';
import './PopupForm.css';
import { uploadDocument } from 'src/services/docs';
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import { useAuth } from 'src/contexts/AuthContext';
interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('designation', designation);
    formData.append('userId', user.id);
    if (file) {
      formData.append('file', file);
    }
    setIsLoading(true);
    const response = await uploadDocument(formData);
    setIsLoading(false);
    if(response?.success) {
      toast.success('Your document has been uploaded for review, we will get back to you soon');
      onClose();
    }
    else {
      toast.error(response?.error?.msg ? response?.error?.msg : "An unknown network error has occured please try again later");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content fade-in">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Submit Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Company Name:
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </label>

          <label>
            Designation:
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </label>

          <label>
            Upload File:
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </label>

          <button type="submit">{isLoading ? <ClipLoader/> : "Upload"}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
