import { FC, useState, useEffect, useCallback } from 'react';
import {
  Card,
  Box,
  Typography,
  useTheme,
  Grid,
  Avatar,
  Button,
  CardContent,
  CardActions,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogActions,
  LinearProgress
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  assignDocument,
  fetchDocuments,
  fetchDocumentsForReview,
  uploadTaxReport
} from 'src/services/docs';
import { toast } from 'react-toastify';
import { useAuth } from 'src/contexts/AuthContext';
interface Document {
  _id: string;
  fileUrl: string;
  originalName: string;
  description?: string;
  name?: string;
  userId?: string;
  company_name?: string;
  designation?: string;
  reviewed?: boolean;
  assigned?: boolean;
  uploadedDate?: string;
}

interface Consultant {
  _id: string;
  name: string;
  email: string;
}

const DocumentCard = styled(Card)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows[6]};
    }
`
);

const ConsultantListItem = styled(ListItem)<{ selected?: boolean }>(
  ({ theme, selected }) => `
    border: 2px solid ${selected ? theme.palette.primary.main : 'transparent'};
    border-radius: ${theme.shape.borderRadius}px;
    margin-bottom: ${theme.spacing(1)};
    transition: border-color 0.2s ease;
    &:hover {
      border-color: ${theme.palette.primary.light};
    }
`
);

const Dropzone = styled('div')<{ isDragActive: boolean }>(
  ({ theme, isDragActive }) => `
    border: 2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[400]};
    border-radius: ${theme.shape.borderRadius}px;
    padding: ${theme.spacing(4)};
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background-color: ${isDragActive ? theme.palette.action.hover : theme.palette.background.paper};
    margin-bottom: ${theme.spacing(2)};
`
);

const RecentOrdersTable: FC = () => {
  const {user, loading} = useAuth();

  const theme = useTheme();
  const [internalDocuments, setInternalDocuments] = useState<Document[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [documentOwnerId, setDocumentOwnerId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role') || 'admin');
  const [selectedConsultantId, setSelectedConsultantId] = useState<string | null>(null);

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchDocs = async () => {
    setIsLoading(true);
    try {
      if (role === 'admin') {
        const response = await fetchDocuments();
        if (response?.success) {
          setInternalDocuments(response.documents || []);
          setConsultants(response.consultants || []);
        } else {
          toast.error(response?.error?.msg || 'Error fetching documents');
          setInternalDocuments([]);
        }
      } else {
        const response = await fetchDocumentsForReview(localStorage.getItem('user_id'));
        if (response?.success) {
          setInternalDocuments(response.documents?.assigned_document || []);
        } else {
          toast.error('Error fetching documents');
          setInternalDocuments([]);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch documents');
      setInternalDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(loading) return;
    if(!user) return;

    if (localStorage.getItem('user_id') && user) {
      fetchDocs();
    }
  }, [loading, user]);

  const handleAssignClick = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setSelectedConsultantId(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDocumentId(null);
    setSelectedConsultantId(null);
  };

  const handleCloseUploadDialog = () => {
    if (!isUploading) {
      setOpenUploadDialog(false);
      setSelectedFile(null);
      setUploadProgress(0);
      setDocumentOwnerId(null);
    }
  };

  const handleConsultantSelect = (consultantId: string) => {
    setSelectedConsultantId(consultantId);
  };

  const handleAssignmentSubmit = async () => {
    if (!selectedDocumentId || !selectedConsultantId) return;

    try {
      const formData = {
        consultant_id: selectedConsultantId,
        document_id: selectedDocumentId
      };

      const response = await assignDocument(formData);
      if (response?.success) {
        toast.success('Document assigned successfully');
        setInternalDocuments(prevDocs => prevDocs.filter(doc => doc._id !== selectedDocumentId));
        handleCloseDialog();
      } else {
        throw new Error(response?.error?.msg);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to assign document');
    }
  };

  // Drag and drop handlers
  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.match('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document|application/vnd.ms-excel|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        setSelectedFile(file);
      } else {
        toast.error('Unsupported file type');
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !selectedDocumentId || !documentOwnerId) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('tax_report', selectedFile);
      formData.append('document_id', selectedDocumentId);
      formData.append('consultant_id', localStorage.getItem('user_id'));
      formData.append('user_id', documentOwnerId)
      console.log(formData)
      const response = await uploadTaxReport(formData

      );

      if (response?.success) {
        toast.success('Tax report uploaded successfully');
        fetchDocs(); 
        handleCloseUploadDialog();
      } else {
        throw new Error(response?.error?.msg);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to upload tax report');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            My Documents
          </Typography>
          <Typography variant="body1">Loading documents...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Documents Up for Review
          </Typography>
          {!internalDocuments || internalDocuments.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No documents found
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {internalDocuments.map((document) => (
                <Grid item xs={12} sm={6} md={4} key={document._id}>
                  <DocumentCard>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                          <DescriptionIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" component="div">
                            {document.originalName || 'Untitled Document'}
                          </Typography>
                          {document.company_name && (
                            <Typography variant="body2" color="text.secondary">
                              {document.company_name} • {document.designation}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {document.description || 'No description available'}
                      </Typography>
                      {document.uploadedDate && (
                        <Typography variant="caption" color="text.secondary">
                          Uploaded: {new Date(document.uploadedDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => downloadFile(document.fileUrl, document.originalName)}
                      >
                        Download
                      </Button>
                      {role === "admin" && (
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleAssignClick(document._id)}
                        >
                          Assign
                        </Button>
                      )}
                      {role === 'consultant' && (
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => {
                            setSelectedDocumentId(document._id);
                            setSelectedConsultantId(localStorage.getItem('user_id'));
                            setDocumentOwnerId(document.userId);
                            setOpenUploadDialog(true);
                          }}
                          disabled={document.reviewed}
                        >
                          {document.reviewed ? 'Report Submitted' : 'Upload Tax Report'}
                        </Button>
                      )}
                    </CardActions>
                  </DocumentCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Card>

      {/* Consultant Assignment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Assign Document to Consultant
          <Typography variant="subtitle2" color="textSecondary">
            Document ID: {selectedDocumentId}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {consultants.length === 0 ? (
            <Typography>No consultants available</Typography>
          ) : (
            <List>
              {consultants.map((consultant) => (
                <ConsultantListItem
                  key={consultant._id}
                  selected={selectedConsultantId === consultant._id}
                  onClick={() => handleConsultantSelect(consultant._id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={consultant.name}
                    secondary={consultant.email}
                  />
                </ConsultantListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAssignmentSubmit}
            color="primary"
            variant="contained"
            disabled={!selectedConsultantId}
          >
            Submit Assignment
          </Button>
        </DialogActions>
      </Dialog>

      {/* File Upload Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={handleCloseUploadDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Upload Tax Report
          <Typography variant="subtitle2" color="textSecondary">
            Document ID: {selectedDocumentId}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Dropzone
            isDragActive={isDragActive}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => document.getElementById('file-input')?.click()}
            disabled={isUploading}
          >
            <CloudUploadIcon fontSize="large" color={isDragActive ? "primary" : "action"} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop the file here' : 'Drag & drop your tax report here'}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              or click to select a file
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
            </Typography>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </Dropzone>
          
          {selectedFile && (
            <Box mt={2}>
              <Typography variant="subtitle1">Selected file:</Typography>
              <Typography variant="body2">{selectedFile.name}</Typography>
              <Typography variant="caption">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </Box>
          )}
          
         
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseUploadDialog} 
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleFileUpload}
            disabled={!selectedFile || isUploading}
            color="primary"
            variant="contained"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecentOrdersTable;