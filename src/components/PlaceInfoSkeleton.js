import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Typography, Card, CardContent } from '@material-ui/core'

const PlaceInfoSkeleton = () => {
  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 26, marginTop: 20 }}><Skeleton variant='text' /></Typography>
      <div className='placeDetailsDivSkeleton'>
        <Card className='placeDetailsCardSkeleton'>
          <CardContent >
            <Skeleton variant="text" width={'100%'} />
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
    </div>
  )
}
export default PlaceInfoSkeleton