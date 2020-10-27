
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Promos from './Promos'
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1000,
  },
}));

export default function PeekPromo() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setBackdropOpen(!backdropOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setBackdropOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} style={{ color: 'white', textTransform: 'none', fontSize: 11 }}>
        Show Codes
      </Button>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >

          <Promos />

        </Popover>
      </Backdrop>
    </div>
  );
}