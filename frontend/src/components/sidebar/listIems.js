import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/DirectionsCar';
import ShoppingCartIcon from '@material-ui/icons/LocalCarWash';
import PeopleIcon from '@material-ui/icons/AttachMoney';  
import BarChartIcon from '@material-ui/icons/Layers';
import LayersIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export const adminListItems = (
  <div>
  <Link component={RouterLink} color="inherit" to="/admin/admin">
      <ListItem button>
        <ListItemIcon>
          <Avatar className="Inkgradient">
            <LayersIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link component={RouterLink} color="inherit" to="/admin/package">
      <ListItem button>
        <ListItemIcon>
          <Avatar className="Orangegradient">
            <LayersIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Packages" />
      </ListItem>
    </Link>

    <Link component={RouterLink} color="inherit" to="/admin/viewNews">
      <ListItem button>
        <ListItemIcon>
          <Avatar className="Pinkgradient">
            <LayersIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
    </Link>

    <Link component={RouterLink} color="inherit" to="/admin/viewUser">
      <ListItem button>
        <ListItemIcon>
          <Avatar className="Pinkgradient">
            <LayersIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>

    <Link component={RouterLink} color="inherit" to="/admin/viewVehicle">
      <ListItem button>
        <ListItemIcon>
          <Avatar className="Pinkgradient">
            <LayersIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Vehicles" />
      </ListItem>
    </Link>

  </div>
);
export const mainListItems = (
  <div>
  <Link component={RouterLink} color="inherit"  to="/search/used">
    <ListItem button>
      <ListItemIcon>
        <Avatar className="Orangegradient">
          <DashboardIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="Used Cars" />
    </ListItem>
    </Link>
    <Link component={RouterLink} color="inherit"  to="/search/new">
    <ListItem button>
      <ListItemIcon>
        <Avatar className="Bluegradient">
          <ShoppingCartIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="New Cars" />
    </ListItem>
    </Link>
    <Link component={RouterLink} color="inherit"  to="/search/all">
    <ListItem button>
      <ListItemIcon>
      <Avatar className="Yellowgradient">
        <DashboardIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="All Cars" />
    </ListItem>
    </Link>
    <Link component={RouterLink} color="inherit"  to="/sell">
    <ListItem button>
      <ListItemIcon>
      <Avatar className="Greengradient">
        <PeopleIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="Sell Car" />
    </ListItem>
    </Link>
    
    
    <ListItem button>
      <ListItemIcon>
        <Avatar className="Inkgradient">
          <BarChartIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="Compare" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar className="Pinkgradient">
          <LayersIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="News & Reviews" />
    </ListItem>

    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset></ListSubheader>
    <Link component={RouterLink} color="inherit" to="/">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    </Link>

    <Link component={RouterLink} color="inherit" to="/about">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="About us" />
    </ListItem>
    </Link>

    <Link component={RouterLink} color="inherit" to="/terms">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Terms & Conditions" />
    </ListItem>
    </Link>
    
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
  </div>
);

export const secondaryadminListItems = (
  <div>
    <ListSubheader inset></ListSubheader>
     
    <Link component={RouterLink} color="inherit" to="/">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Public Site" />
    </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Terms & Conditions" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
  </div>
);
