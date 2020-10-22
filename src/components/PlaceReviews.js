import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';


const PlaceReviews = ({ place }) => {

  return (
    <div className='sticky-head'>
      <div className='placeReviewsInnerDiv' >
        {place.reviews !== undefined ?
          place.reviews.map(r =>
            < Card key={r.author_name} className='placeReviewsCard'>
              <CardContent >
                <Avatar src={r.profile_photo_url} />
                <Typography variant="body1" component="p">
                  {r.author_name}
                </Typography>
                <Typography style={{ fontSize: 10 }}>{r.relative_time_description}</Typography>
                <Rating name="read-only" value={r.rating} readOnly precision={0.5} />
                <Typography variant="body2" color="textSecondary" component="p">
                  {r.text}
                </Typography>
              </CardContent>
            </Card >
          )
          : <h3>No reviews</h3>}
      </div>
    </div>
  )
}
export default PlaceReviews