import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Typography, CardContent } from '@material-ui/core'

const PlaceInfoSkeleton = () => {
  return (
    <div className='sticky-head-places'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>
        <Skeleton variant='text' /></Typography>
      <br />
      <div className='placeDetailsDiv'>
        <div className='placeDetailsCard'>
          <CardContent style={{ minWidth: 240, maxWidth: 400, marginLeft: 30 }}>
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
          </CardContent>
        </div>
        <div className='placeDetailsCard'>
          <CardContent style={{ minWidth: 240, maxWidth: 400, marginLeft: 30 }}>
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
            <Skeleton variant='text' style={{ backgroundColor: '#262424' }} />
          </CardContent>
        </div>
      </div>
    </div>
  )
}
// <div className='sticky-head'>
//   <Typography variant='body1' style={{ textAlign: 'center', fontSize: 26, marginTop: 20 }}><Skeleton variant='text' /></Typography>
//   <div className='placeDetailsDivSkeleton'>
//     <Card className='placeDetailsCardSkeleton'>
//       <CardContent >
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//         <Skeleton variant="text" width={'100%'} />
//       </CardContent>
//     </Card>
//   </div>
// </div>
//   )
// }
export default PlaceInfoSkeleton