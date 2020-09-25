import React from 'react';
import { Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const HomeMarker = (props) => {
  const { name } = props;
  return (
    <div className="marker"
      title={name}>
      <Avatar alt='logo' height={15} width={15} style={{ backgroundColor: '#554fc2', zIndex: 1000 }} ><HomeIcon /></Avatar>
    </div>
  );
};

export default HomeMarker;