import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useEffect, useState } from 'react';
import { getUserInfo } from 'src/services/auth';
import { toast } from 'react-toastify';
import { updateUserInfo } from 'src/services/auth';
import { useAuth } from 'src/contexts/AuthContext';
function EditProfileTab() {
  const [formData, setFormData] = useState({
    id:'',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const {user, loading} = useAuth();
  const [editMode, setEditMode] = useState({
    personal: false,
    account: false,
    email: false
  });

  useEffect(() => {
    if(loading) return;
    const fetchInfo = async() => {
      const response = await getUserInfo(localStorage.getItem('user_id'));
      if(response?.success) {
        setFormData({
          id:response.user._id,
          first_name: response.user.first_name || response.user.name || '',
          last_name: response.user.last_name || '',
          email: response.user.email || '',
          phone: response.user.phone || ''
        });
      } else {
        toast.error("Some error occurred while fetching your user information");
      }
    }
    fetchInfo();
  }, [loading, user]);

  const handleEditClick = (section) => {
    setEditMode({
      ...editMode,
      [section]: true
    });
  };

  const handleCancelClick = (section) => {
    setEditMode({
      ...editMode,
      [section]: false
    });
  };

  const handleSaveClick = async (section) => {
    
    const response = await updateUserInfo(formData);
    console.log(formData)
    if(response?.success) {
      setEditMode({
      ...editMode,
      [section]: false
    });
    toast.success('Account info updated successfully');
    }
    else if(response?.error?.msg) {
      toast.error(response.error.msg);
    }
    else {
      toast.error('Some error occured while updating your information')
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Personal Details Card */}
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage information related to your personal details
              </Typography>
            </Box>
            {!editMode.personal ? (
              <Button 
                variant="text" 
                startIcon={<EditTwoToneIcon />}
                onClick={() => handleEditClick('personal')}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <Button 
                  variant="text" 
                  startIcon={<CloseTwoToneIcon />}
                  onClick={() => handleCancelClick('personal')}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="text" 
                  startIcon={<DoneTwoToneIcon />}
                  onClick={() => handleSaveClick('personal')}
                  color="success"
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={0}>
              {/* Name Field */}
              <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Name:
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                {editMode.personal ? (
                  <Box display="flex" gap={2}>
                    <TextField
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      label="First Name"
                      size="small"
                    />
                    {localStorage.getItem('role') === "user" && (
                      <TextField
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      label="Last Name"
                      size="small"
                    />
                    )}
                  </Box>
                ) : (
                  <Text color="black">
                    <b>{formData.first_name} {formData.last_name}</b>
                  </Text>
                )}
              </Grid>
              
              {/* Phone Field */}
              <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Phone:
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                {editMode.personal ? (
                  <>
                  {localStorage.getItem('role') === "user" && (
                    <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                  )}
                  </>
                ) : (
                  <Text color="black">
                    <b>{formData.phone || 'Not provided'}</b>
                  </Text>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your account
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Language:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>English (US)</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Timezone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>GMT +2</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Account status:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color="success">
                    <DoneTwoToneIcon fontSize="small" />
                    <b>Active</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Email Addresses Card */}
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
            {!editMode.email ? (
              <Button 
                variant="text" 
                startIcon={<EditTwoToneIcon />}
                onClick={() => handleEditClick('email')}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <Button 
                  variant="text" 
                  startIcon={<CloseTwoToneIcon />}
                  onClick={() => handleCancelClick('email')}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="text" 
                  startIcon={<DoneTwoToneIcon />}
                  onClick={() => handleSaveClick('email')}
                  color="success"
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Email ID:
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                {editMode.email ? (
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                ) : (
                  <>
                    <Text color="black">
                      <b>{formData.email}</b>
                    </Text>
                    <Box pl={1} component="span">
                      <Label color="success">Primary</Label>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;