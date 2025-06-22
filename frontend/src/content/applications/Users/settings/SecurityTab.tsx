import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Alert,
  Snackbar
} from '@mui/material';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format, subHours, subWeeks, subDays } from 'date-fns';
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
// Styled Components
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);
import { updatePassword } from 'src/services/auth';

function SecurityTab() {
  const theme = useTheme();
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Pagination handlers
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Password dialog handlers
  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validatePasswordForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitPasswordChange = async () => {
    const formData = {
      id:localStorage.getItem('user_id'),
      current_password:passwordData.currentPassword,
      password:passwordData.newPassword,
    }
    setIsLoading(true);
    const response = await updatePassword(formData);
    setIsLoading(false);
    console.log(response)
    if(response?.success) {
      toast.success("Password updated successfully");
      setOpenPasswordDialog(false)
    }
    else if(response?.error?.msg) {
      toast.error(response.error.msg);
    
    }
    else {
      toast.error('An unknown network error has occured please try again later')
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Sample login logs data
  const logs = [
    {
      id: 1,
      browser: 'Safari/537.36',
      ipaddress: '3.70.73.142',
      location: 'United States',
      date: subDays(new Date(), 2).getTime()
    },
    {
      id: 2,
      browser: 'Chrome/36.0.1985.67',
      ipaddress: '138.13.136.179',
      location: 'China',
      date: subDays(new Date(), 6).getTime()
    },
    {
      id: 3,
      browser: 'Googlebot/2.1',
      ipaddress: '119.229.170.253',
      location: 'China',
      date: subHours(new Date(), 15).getTime()
    },
    {
      id: 4,
      browser: 'AppleWebKit/535.1',
      ipaddress: '206.8.99.49',
      location: 'Philippines',
      date: subDays(new Date(), 4).getTime()
    },
    {
      id: 5,
      browser: 'Mozilla/5.0',
      ipaddress: '235.40.59.85',
      location: 'China',
      date: subWeeks(new Date(), 3).getTime()
    }
  ];

  return (
    <>
      <Grid container spacing={3}>
        {/* Social Accounts Section */}
        <Grid item xs={12}>
          <Box pb={2}>
            <Typography variant="h3">Social Accounts</Typography>
            <Typography variant="subtitle2">
              Manage connected social accounts options
            </Typography>
          </Box>
          <Card>
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <AvatarWrapper src="/static/images/logo/google.svg" />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Google"
                  secondary="A Google account hasn't been yet added to your account"
                />
                <Button color="secondary" size="large" variant="contained">
                  Connect
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
        </Grid>

        {/* Connected Accounts Section */}
        <Grid item xs={12}>
          <Card>
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <AvatarSuccess>
                    <DoneTwoToneIcon />
                  </AvatarSuccess>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Facebook"
                  secondary="Your Facebook account has been successfully connected"
                />
                <ButtonError size="large" variant="contained">
                  Revoke access
                </ButtonError>
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <AvatarSuccess>
                    <DoneTwoToneIcon />
                  </AvatarSuccess>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Twitter"
                  secondary="Your Twitter account was last synchronized 6 days ago"
                />
                <ButtonError size="large" variant="contained">
                  Revoke access
                </ButtonError>
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Security Preferences Section */}
        <Grid item xs={12}>
          <Box pb={2}>
            <Typography variant="h3">Security</Typography>
            <Typography variant="subtitle2">
              Change your security preferences below
            </Typography>
          </Box>
          <Card>
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Change Password"
                  secondary="You can change your password here"
                />
                <Button 
                  size="large" 
                  variant="outlined"
                  onClick={handleOpenPasswordDialog}
                >
                  Change password
                </Button>
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ p: 3 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Two-Factor Authentication"
                  secondary="Enable PIN verification for all sign in attempts"
                />
                <Switch color="primary" />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Access Logs Section */}
         

      {/* Password Change Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password, please enter your current password and then your new password twice.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
          />
          <TextField
            margin="dense"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword || 'Minimum 8 characters'}
          />
          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitPasswordChange} 
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader /> : 'Change'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SecurityTab;