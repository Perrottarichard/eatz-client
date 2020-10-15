import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Receipt, Loyalty } from '@material-ui/icons';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="My Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/dashboard/cart">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="My Cart" />
    </ListItem>
    <ListItem button component={Link} to="/dashboard/orders">
      <ListItemIcon>
        <Receipt />
      </ListItemIcon>
      <ListItemText primary="My Orders" />
    </ListItem>
    {/* <ListItem button component={Link} to="/dashboard/promotions">
      <ListItemIcon>
        <Loyalty />
      </ListItemIcon>
      <ListItemText primary="My Promotions" />
    </ListItem> */}
    {/* <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);