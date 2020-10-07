import React from 'react'
import Rating from '@material-ui/lab/Rating';
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
          < Card key={r.author_name} >
            <CardContent className='placeReviewsCard'>

              <Typography variant="p" component="p">
                {r.author_name}
                <Avatar src={r.profile_photo_url} />
                <Typography style={{ fontSize: 10 }}>{r.relative_time_description}</Typography>
              </Typography>
              <Rating name="read-only" value={r.rating} readOnly />
              <Typography variant="body2" color="textSecondary" component="p">
                {r.text}
              </Typography>
              <Typography variant="body2" component="h6">

              </Typography>
            </CardContent>
          </Card >
        )
        : <h3>No reviews</h3>}
    </div>
  )
}
export default PlaceReviews