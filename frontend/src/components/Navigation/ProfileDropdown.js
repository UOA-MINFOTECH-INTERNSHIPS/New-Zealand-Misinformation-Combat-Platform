import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar,Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Button} from '@mui/material';
import {Logout} from '@mui/icons-material';



export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /*const user = {
        username: "llia464",
        name: "Linda",
        email: "123@bla.com",
        password: "123"
  }*/
  const user = null;
  return (
    <React.Fragment>
      {user ? (
        <div>
        <IconButton  onClick={handleClick} sx={{ ml:110, mr: 1 }}>
          <Avatar sx={{width: 35, height: 35, }}> {user.name.charAt(0)} </Avatar>
          <Typography variant ="h6" color ='white' ml ='10px'> {user.name} </Typography>
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
             <MenuItem> <a className='profile' href='/profile'>Profile </a></MenuItem>
             <MenuItem> My articles</MenuItem>
             <Divider />
             <MenuItem ><a className='logout' href='/'>
               <ListItemIcon>
                 <Logout fontSize="small" />
               </ListItemIcon>
               Logout
               </a>
             </MenuItem>
           </Menu>
           </div>
      ) : (
        <div className='notLogged'>        
          <Button component={Link} to='/login' variant = 'outlined' sx={{ ml:110, mr: 1 }}>Login</Button>
          <Button component={Link} to='/register' variant ='outlined'>Register</Button>
        </div>

      )}; 
      
    </React.Fragment>
  );
}