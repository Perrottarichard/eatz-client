import React from 'react';
import { useHistory } from 'react-router-dom'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';

const MapMarker = (props) => {
  const { name, place_id } = props;
  const history = useHistory()

  const handleClick = (place_id) => {
    history.push(`/dashboard/restaurant/${place_id}`)
  }
  return (
    <div className="marker"
      style={{ fontSize: 18 }}
      title={name}>
      <IconButton onClick={() => handleClick(place_id)}>
        <FontAwesomeIcon icon={faPizzaSlice} style={{ color: '#ff430a' }} />
      </IconButton>
    </div>
  );
};

export default MapMarker;