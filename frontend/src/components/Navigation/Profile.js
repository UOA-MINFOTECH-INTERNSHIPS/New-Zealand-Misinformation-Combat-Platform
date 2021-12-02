import * as React from 'react';
import {
    Box, Avatar,Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, 
    Tooltip} from '@mui/material';
import {
    Logout, Settings, PersonAdd
} from '@mui/icons-material';


export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
            <IconButton  onClick={handleClick} >
                    <Avatar sx={{width: 35, height: 35, }}>L</Avatar>
            </IconButton>
    
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
            '& .MuiAvatar-root': {width: 32, height: 32, ml: -0.5, mr: 1,},
            '&:before': {
                content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, 
                height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem> Profile</MenuItem>
        <MenuItem> My articles</MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
    </React.Fragment>
  );
}