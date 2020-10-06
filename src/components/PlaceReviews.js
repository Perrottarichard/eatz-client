import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';

const PlaceReviews = ({ place }) => {
  return (
    <div>
      <h5 className='sticky-head'>Reviews</h5>
      {place.reviews !== undefined ?
        place.reviews.map(r =>
          < Card key={r.author_name}>
            <CardContent>
              <Avatar src={r.profile_photo_url} />
              <Typography variant="h6" component="h6">
                {r.author_name}
                <span style={{ fontSize: 10, float: 'right', lineHeight: 3 }}>{r.relative_time_description}</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {r.text}
              </Typography>
              <Typography variant="body2" component="p">
                Rating: {r.rating}
              </Typography>
            </CardContent>
          </Card >
        )
        : <h3>No reviews</h3>}
    </div>
  )
}
export default PlaceReviews