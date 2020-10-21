
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Phone } from '@material-ui/icons';

const PlaceNameAddress = ({ place }) => {

  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}><strong>Contact</strong></Typography>
      <div className='placeDetailsDiv'>
        {place !== undefined ?
          <Card className='placeDetailsCard'>
            <CardContent>
              <Typography variant='body1' color='textPrimary'>{place.name}</Typography>
              <Typography variant='body2' color='textSecondary'>{place.formatted_address}</Typography>
              <br />
              <Typography variant='body1' color='textPrimary'>
                <Phone />
              </Typography>
              <Typography variant="body2" color='textSecondary' component="p">
                {place.formatted_phone_number}
              </Typography>
            </CardContent>
          </Card>
          : <h3>Loading...</h3>}
      </div>
    </div>
  )
}

export default PlaceNameAddress