import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import { useAuth } from 'src/contexts/AuthContext';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { getUserInfo } from 'src/services/auth';
import {toast} from "react-toastify";
const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const userDemo = {
    name: 'John Doe',
    avatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    jobtitle: 'User'
  };
  
type UserRole = "admin" | "user" | 'consultant';
  const [name, setName] = useState<UserRole>();
  const {user, loading} = useAuth();
  useEffect(()=> {
    if(loading) return;
    const fetchUser= async()=> {
      if(!user) {
        return;
      }
      if(localStorage.getItem('role') === "admin") {
        setName('admin');
        return;
      }

      const user_id = localStorage.getItem('user_id');
      
      if(!user_id) {
        toast.error('Please login to access your account');
        return;
      }
      const response = await getUserInfo(user_id) 
    
      if(response?.success) {
        setName(response.user?.first_name || response?.user?.name);
        return;
      }
      else {
        toast.error('Some error occured while fetching your info');
      }
      
    }
    fetchUser()
  },[loading, user]);
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={userDemo.name} src={userDemo.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{name ? name :"not found"}</UserBoxLabel>
            <UserBoxDescription variant="body2">
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={name} src={userDemo.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{name ? name :"not found"}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {userDemo.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/" component={NavLink}>
            <HomeTwoToneIcon fontSize="small" />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button to="/profile" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button to="/messages" component={NavLink}>
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button to="/settings" component={NavLink}>
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;