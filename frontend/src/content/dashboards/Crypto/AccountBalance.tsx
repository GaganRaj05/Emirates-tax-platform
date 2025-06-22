import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  CardContent,
  CardActions
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from 'src/contexts/AuthContext';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { fetchUserDocs, fetchTaxReports } from 'src/services/docs';
import { toast } from 'react-toastify';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

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

const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function AccountBalance() {
  const theme = useTheme();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  const [taxReports, setTaxReports] = useState([]);

  const fetchDocs = async () => {
      setIsLoading(true);
      const response = await fetchUserDocs(localStorage.getItem('user_id'));

      if (response?.success) {
        setDocuments(
          Array.isArray(response.documents) ? response.documents : []
        );
      } else {
        toast.error(
          response?.message ||
            'Some error occurred while fetching your documents'
        );
        setDocuments([]);
      }
      setIsLoading(false);
    
  };

  const fetchTaxDocs = async() => {
    try { 
      if(!localStorage.getItem('user_id')) return;
      const response = await fetchTaxReports(localStorage.getItem('user_id'));

      if(response?.success) {
        setTaxReports(response.tax_docs);
      }
      else {
        toast.error('Some error occured while fetching you tax reports. Please try again later');
      }
      
    }
    catch(err) {
      console.log(err.message);
      console.log('Some error occured in the component');
    }
  }

  useEffect(() => {
    if(loading) return;
    if(!user) {
      return;
    }
    if (localStorage.getItem('user_id')) {
       fetchDocs();
       fetchTaxDocs();
    }
  }, [user, loading]);

  if (isLoading) {
    return (
      <Card>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            My Documents
          </Typography>
          <Typography variant="body1">Loading Documents...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <>
      {/* First Card - Documents */}
      <Card sx={{ mb: 4 }}>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            My Documents
          </Typography>
          {!documents || documents.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No documents found
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {documents.map((document) => (
                <Grid item xs={12} sm={6} md={4} key={document._id || document.fileUrl}>
                  <DocumentCard>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}
                        >
                          <DescriptionIcon />
                        </Avatar>
                        <Typography variant="h6" component="div">
                          {document.originalName || 'Untitled Document'}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {document.description || 'No description available'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          downloadFile(
                            document.fileUrl,
                            document.name || 'document'
                          )
                        }
                      >
                        Download
                      </Button>
                      <Button size="small" color="secondary">
                        Share
                      </Button>
                    </CardActions>
                  </DocumentCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Card>

      <Card sx={{ mb: 4 }}>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            My Tax Report
          </Typography>
          {!taxReports || taxReports.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No tax reports found
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {taxReports.map((tax) => (
                <Grid item xs={12} sm={6} md={4} key={tax._id || tax.fileUrl}>
                  <DocumentCard>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}
                        >
                          <DescriptionIcon />
                        </Avatar>
                        <Typography variant="h6" component="div">
                          {tax.filename || 'Untitled Document'}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          downloadFile(
                            tax.fileUrl,
                            tax.filename || 'document'
                          )
                        }
                      >
                        Download
                      </Button>
                      <Button size="small" color="secondary">
                        Share
                      </Button>
                    </CardActions>
                  </DocumentCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Card>


      {/* Second Card - Different Content */}
      <Card>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Additional Information
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Here you can add any other content you want to display in the second card.
          </Typography>
          
          {/* Example of different content - could be stats, charts, etc. */}
          <Box display="flex" alignItems="center" mt={2}>
            <AvatarSuccess>
              <TrendingUp />
            </AvatarSuccess>
            <Box ml={2}>
              <Typography variant="h5">Statistics</Typography>
              <Typography variant="subtitle2">
                Document activity overview
              </Typography>
            </Box>
          </Box>
          
          <List sx={{ mt: 2 }}>
            <ListItem>
              <ListItemAvatarWrapper>
                <DescriptionIcon color="primary" />
              </ListItemAvatarWrapper>
              <ListItemText
                primary="Total Documents"
                secondary={documents.length}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemAvatarWrapper>
                <DescriptionIcon color="success" />
              </ListItemAvatarWrapper>
              <ListItemText
                primary="Recent Activity"
                secondary="Last updated today"
              />
            </ListItem>
          </List>
        </Box>
      </Card>
    </>
  );
}

export default AccountBalance;
