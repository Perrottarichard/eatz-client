
import React from 'react'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CheckCircleOutline, Phone, RemoveCircleOutline } from '@material-ui/icons';

const PlaceNameAddress = ({ place }) => {

  return (
    <div className='sticky-head-places'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}><strong></strong></Typography>
      <br />
      <div className='placeDetailsDiv'>
        <div className='placeDetailsCard'>
          <CardContent style={{ minWidth: 240, maxWidth: 400 }}>
            <Typography variant='body1' >{place.name}</Typography>
            <Typography variant='body2' >{place.formatted_address}</Typography>
            <br />
            <Typography variant='body1' >
              <Phone style={{ color: '#ff2f0a' }} />
            </Typography>
            <Typography variant="body2" component="p">
              {place.formatted_phone_number}
            </Typography>
          </CardContent>
        </div>
        <div className='placeDetailsCard'>
          <CardContent style={{ minWidth: 240, maxWidth: 400 }}>
            {place.opening_hours.open_now
              ?
              <Chip label="Open Now" size='small' icon={<CheckCircleOutline style={{ color: 'green' }} />} style={{ marginBottom: 10, color: 'white' }} />
              :
              <Chip label="Closed Now" size='small' icon={<RemoveCircleOutline style={{ color: 'red' }} />} style={{ marginBottom: 10 }} />}
            <Typography variant="caption" component="ul" style={{ listStyleType: 'none', padding: 0 }}>
              {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
            </Typography>
          </CardContent>
        </div>
      </div>
    </div>
  )
}

export default PlaceNameAddress