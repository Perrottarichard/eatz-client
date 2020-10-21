import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Place, Receipt } from '@material-ui/icons';

const MainListItems = ({ handleDrawerClose }) => {

  return (
    <div>
      <ListItem button component={Link} to="/dashboard" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <Place />
        </ListItemIcon>
        <ListItemText primary="Places" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/cart" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Cart" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/orders" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/account" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
      {/* <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
    </div>
  )
}
export default MainListItems