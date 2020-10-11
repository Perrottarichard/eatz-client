
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const PlaceNameAddress = ({ place }) => {

  return (
    <div style={{ height: '100%' }}>
      <h5 className='sticky-head'>Restaurant</h5>
      {place !== undefined ?
        <Card style={{ height: 178 }}>
          <CardContent>
            <Typography variant='body1' color='textPrimary'>{place.name}</Typography>
            <Typography variant='body2' color='textSecondary'>{place.formatted_address}</Typography>
          </CardContent>
        </Card>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default PlaceNameAddress