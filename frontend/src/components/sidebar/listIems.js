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

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
      <Avatar className="Orangegradient">
        <DashboardIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="Used Cars" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <Avatar className="Bluegradient">
        <ShoppingCartIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="New Cars" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <Avatar className="Greengradient">
        <PeopleIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="Sell Car" />
    </ListItem>
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
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="About us" />
    </ListItem>
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
