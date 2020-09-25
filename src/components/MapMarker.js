import React from 'react';
import logo from '../assets/pizzapizza20trans.png'
// import './Marker.css';

const MapMarker = (props) => {
  const { color, name } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer', width: 25, height: 25, borderStyle: "solid", borderWidth: 0.5, borderColor: 'red', borderRadius: '50%', textAlign: 'center', padding: 3, lineHeight: 3.5 }}
      title={name}>
      <img src={logo} alt='logo'></img>
    </div>
  );
};

export default MapMarker;