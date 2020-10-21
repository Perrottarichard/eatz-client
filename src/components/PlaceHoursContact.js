
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { CheckCircleOutline, Phone, RemoveCircleOutline, Schedule } from '@material-ui/icons';

const PlaceHoursContact = ({ place }) => {
  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}><strong>Hours</strong></Typography>
      <div className='placeDetailsDiv'>
        {place !== undefined ?
          <Card className='placeDetailsCard'>
            <CardContent>
              {place.opening_hours.open_now
                ?
                <Chip label="Open Now" size='small' icon={<CheckCircleOutline style={{ color: 'green' }} />} style={{ marginBottom: 10 }} />
                :
                <Chip label="Closed Now" size='small' icon={<RemoveCircleOutline style={{ color: 'red' }} />} style={{ marginBottom: 10 }} />}
              <Typography variant="caption" color="textSecondary" component="ul" style={{ listStyleType: 'none', padding: 0 }}>
                {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
              </Typography>
            </CardContent>
          </Card>
          : <h3>Loading...</h3>}
      </div>
    </div >
  )
}

export default PlaceHoursContact


