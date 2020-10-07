
import React from 'react'
import { Container } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { CheckCircleOutline, RemoveCircleOutline } from '@material-ui/icons';



const PlaceHoursContact = ({ place }) => {

  return (
    <div>
      <h5 className='sticky-head'>Hours and Contact</h5>
      {place !== undefined ?
        <Card>
          {place.opening_hours.open_now
            ?
            <Chip label="Open" icon={<CheckCircleOutline style={{ color: 'green' }} />} />
            :
            <Chip label="Closed" icon={<RemoveCircleOutline style={{ color: 'red' }} />} />}
          <CardContent>
            <Typography variant='body1' color='textPrimary'>
              Phone:
          </Typography>
            <Typography variant="body2" color='textSecondary' component="p">
              {place.formatted_phone_number}
            </Typography>
            <br />
            <Typography variant='body1' color='textPrimary'>
              Operating Hours:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="ul">
              {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
            </Typography>
          </CardContent>
        </Card>
        : <h3>Loading...</h3>}

    </div >
  )
}

export default PlaceHoursContact


