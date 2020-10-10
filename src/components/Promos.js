import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initPromos } from '../reducers/placesReducer'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';


const Promos = () => {

  const promos = useSelector(state => state.placesReducer.promos ? state.placesReducer.promos : null)

  const dispatch = useDispatch()
  const isMountedRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    if (!promos) {
      dispatch(initPromos())
    }
    return () => isMountedRef.current = false
  }, [dispatch, promos])

  return (
    <div className='dashDiv'>
      <h5 className='sticky-head'>Promotions
      {/* <Button style={{ float: 'right', height: 'auto', textTransform: 'none', lineHeight: 0.5, color: 'white' }}>next page</Button> */}
      </h5>
      {promos ? promos.map(p =>
        <Card key={p._id}>
          <CardHeader title={`Promo Code: ${p.code}`} />
          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
              {p.description}
            </Typography>
          </CardContent>
        </Card>
      )
        : null}
    </div>
  )
}
export default Promos