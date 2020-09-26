import React from 'react';
import logo from '../assets/pizzapizza20trans.png'
// import './Marker.css';

const MapMarker = (props) => {
  const { color, name, place_id } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer', width: 25, height: 25, borderStyle: "solid", borderWidth: 0.5, borderColor: 'red', borderRadius: '50%', textAlign: 'center', padding: 3, lineHeight: 3.5 }}
      title={name}>
      <a href={place_id}>
        <img src={logo} alt='logo'></img>
      </a>
    </div>
  );
};

export default MapMarker;