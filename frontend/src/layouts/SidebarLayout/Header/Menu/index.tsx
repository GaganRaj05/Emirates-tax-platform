import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
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
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/dashboard"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/products"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Products"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/customers"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Customers"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  More
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu 
        anchorEl={ref.current} 
        onClose={handleClose} 
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem 
          sx={{ px: 3, minWidth: 180 }} 
          component={NavLink} 
          to="/analytics"
        >
          <AnalyticsTwoToneIcon sx={{ mr: 1 }} />
          Analytics
        </MenuItem>
        <MenuItem 
          sx={{ px: 3, minWidth: 180 }} 
          component={NavLink} 
          to="/settings"
        >
          <SettingsTwoToneIcon sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem 
          sx={{ px: 3, minWidth: 180 }} 
          component={NavLink} 
          to="/reports"
        >
          <DashboardTwoToneIcon sx={{ mr: 1 }} />
          Reports
        </MenuItem>
        <MenuItem 
          sx={{ px: 3, minWidth: 180 }} 
          component={NavLink} 
          to="/support"
        >
          <PeopleAltTwoToneIcon sx={{ mr: 1 }} />
          Support
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;