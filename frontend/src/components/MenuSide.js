import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux'

const options = [
  {label:'Login', ref:"/signin", pub:true},
  {label:'Register', ref:"/register", pub:true},
  {label:'Inbox', ref:"/inbox/", pub:false},
  {label: 'My Listing', ref:"/my-listing",  pub:false},
  {label: 'Saved Listing', ref:"/saved-listing",  pub:false},
  {label: 'Profile', ref:"/profile",  pub:false},
  {label: 'Logout', ref:"/logout",  pub:false},

];


export default function MenuSide(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
       
      >
        {options.map(option => (
          (isAuthenticated ^ option.pub)?
          <Link component={RouterLink} color="inherit" to={option.ref}>
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option.label}
          </MenuItem>
          </Link>
          :""
        ))}
      </Menu>
    </div>
  );
}