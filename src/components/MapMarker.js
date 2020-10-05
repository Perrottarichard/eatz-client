import React from 'react';
import { useHistory } from 'react-router-dom'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';

const MapMarker = (props) => {
  const { name, place_id } = props;
  const history = useHistory()

  const handleClick = (place_id) => {
    history.push(`/dashboard/${place_id}`)
  }
  return (
    <div className="marker"
      style={{ fontSize: 25 }}
      title={name}>
      <IconButton onClick={() => handleClick(place_id)}>
        <FontAwesomeIcon icon={faPizzaSlice} style={{ color: '#f77943' }} />
      </IconButton>
    </div>
  );
};

export default MapMarker;