import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assignDocument, uploadTaxReport } from "services/docs";
import { ClipLoader } from "react-spinners";

export default function Dashboard({ userRole, consultants, initialDocs }) {
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [consultatId, setConsultantId] = useState(
    localStorage.getItem("consultant_id") || null
  );
  const [documentOwnerId, setDocumentOwnerId] = useState();
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setDocuments(initialDocs);
  }, [initialDocs]);

    const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf" || droppedFile.type === "application/docs" ||droppedFile.type === "application/csv") {
      setFile(droppedFile);
    } else {
      toast.error("Please upload a PDF file");
    }
  };
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    try {

      const formData = new FormData();
      formData.append("consultant_id", consultatId);
      formData.append('document_id', selectedDocument);
      formData.append('user_id', documentOwnerId)
      formData.append('file', file);

      const response = await uploadTaxReport(formData);
      if(response?.error) {
        toast.error('An unknown network error has occured please try again later');
        return;
      }      

      toast.success("Tax report uploaded successfully");
              setDocuments((prevDocs) =>
          prevDocs.filter((doc) => doc._id !== selectedDocument)
        );

      setShowUploadPopup(false);
      setFile(null);
    } catch (error) {
      toast.error("Failed to upload tax report");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    window.open(fileUrl, '_blank')
  };

  const handleAssign = (documentId) => {
    setSelectedDocument(documentId);
    setShowAssignPopup(true);
  };

  const handleClosePopup = () => {
    setShowAssignPopup(false);
    setSelectedDocument(null);
  };

  const handleAssignToConsultant = async (consultantId) => {
    setIsLoading(true);
    const formData = {
      document_id: selectedDocument,
      consultant_id: consultantId,
    };

    try {
      const response = await assignDocument(formData);
      setIsLoading(false);

      if (response?.success) {
        toast.success("Document assigned successfully");
        setDocuments((prevDocs) =>
          prevDocs.filter((doc) => doc._id !== selectedDocument)
        );
        handleClosePopup();
      } else {
        toast.error(response?.message || "Failed to assign document");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {/* Main Dashboard Content */}
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div
            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            {/* Documents Header */}
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Documents
                  </h3>
                </div>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="block w-full overflow-x-auto">
              {documents?.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4 p-4">
                  {documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="p-2"
                      style={{ width: "300px", height: "300px" }}
                    >
                      <div className="relative group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="h-full flex flex-col justify-between">
                          <div className="h-40 w-full overflow-hidden">
                            <iframe
                              src={doc.fileUrl}
                              title="PDF Preview"
                              className="w-full h-full"
                              frameBorder="0"
                            ></iframe>
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-gray-800 truncate">
                              {doc.originalName}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {doc.company_name} • {doc.designation}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Uploaded:{" "}
                              {new Date(doc.uploadedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(doc.fileUrl, doc.originalName);
                              }}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Download
                            </button>
                            {userRole === "admin" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAssign(doc._id);
                                }}
                                disabled={isLoading}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                              >
                                {isLoading ? (
                                  <ClipLoader size={15} color="#ffffff" />
                                ) : (
                                  "Assign"
                                )}
                              </button>
                            )}
                            {userRole === "consultant" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowUploadPopup(true);
                                  setSelectedDocument(doc._id);
                                  setDocumentOwnerId(doc.userId);
                                }}
                                disabled={isLoading}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                              >
                                {isLoading ? (
                                  <ClipLoader size={15} color="#ffffff" />
                                ) : (
                                  "Upload TaxReport"
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No documents found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    There are currently no documents available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAssignPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-fadeIn"
            style={{
              position: "fixed",
              minHeight: "500px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxHeight: "90vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxWidth: "800px",
            }}
          >
            {/* Modal Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Assign Document to Consultant
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Document ID: {selectedDocument})
                </span>
              </h3>
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Consultant List */}
            <div className="p-6 overflow-y-auto flex-grow flex flex-wrap justify-center">
              {consultants?.map((consultant) => (
                <div
                  key={consultant._id}
                  className="relative group flex items-center p-3 mb-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ height: "200px", width: "300px", margin: "10px" }}
                >
                  <div className="flex items-center w-full">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      {consultant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium">{consultant.name}</h4>
                      <p className="text-sm text-gray-500">
                        {consultant.email}
                      </p>
                      <div className="text-xs text-gray-600 mt-1">
                        <p>
                          Specialization: {consultant.specialization || "N/A"}
                        </p>
                        <p>Experience: {consultant.experience || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Assign Button (Shows on Hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignToConsultant(consultant._id);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Assign Document
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-4 bg-gray-50">
              <button
                onClick={handleClosePopup}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
            {showUploadPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-fadeIn"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upload Tax Report</h3>
              <button 
                onClick={() => setShowUploadPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Upload Form */}
            <div className="p-6 flex-grow">
              <form onSubmit={handleUploadSubmit}>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    {file ? (
                      <span className="font-medium">{file.name}</span>
                    ) : isDragging ? (
                      "Drop your tax report here"
                    ) : (
                      <>
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PDF files only (max. 30MB)
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {file && (
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600 truncate">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={!file || isLoading}
  className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-900 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <ClipLoader size={16} color="#ffffff" className="mr-2" />
                        Uploading...
                      </span>
                    ) : (
                      "Upload Tax Report"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
            )}
            
      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -55%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
