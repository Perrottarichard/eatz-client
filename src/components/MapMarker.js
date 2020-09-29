import React from 'react';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MapMarker = (props) => {
  const { name, place_id } = props;
  return (
    <div className="marker"
      style={{ fontSize: 25 }}
      title={name}>
      <a href={place_id}>
        <FontAwesomeIcon icon={faPizzaSlice} style={{ color: '#f77943' }} />
      </a>
    </div>
  );
};

export default MapMarker;