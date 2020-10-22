
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { CheckCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';

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
                <Chip label="Open Now" variant='outlined' size='small' icon={<CheckCircleOutline style={{ color: 'green' }} />} style={{ marginBottom: 10 }} />
                :
                <Chip label="Closed Now" variant='outlined' size='small' icon={<RemoveCircleOutline style={{ color: 'red' }} />} style={{ marginBottom: 10 }} />}
              <Typography variant="caption" color="textSecondary" component="ul" style={{ listStyleType: 'none', padding: 0 }}>
                {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
              </Typography>
            </CardContent>
          </Card>
          :
          <div className='placeDetailsDiv'>
            <Card className='placeDetailsCard'>
              <CardContent style={{ paddingLeft: 100, paddingRight: 100 }}>
                <Skeleton variant="rect" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'100%'} />
              </CardContent>
            </Card>
          </div>
        }
      </div>
    </div >
  )
}

export default PlaceHoursContact


