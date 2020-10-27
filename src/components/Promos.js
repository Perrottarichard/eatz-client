import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initPromos } from '../reducers/placesReducer'
import { Card, Button, CardContent, CardActions, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Grow from '@material-ui/core/Grow';



const Promos = () => {

  const promos = useSelector(state => state.placesReducer.promos ? state.placesReducer.promos : null)

  const dispatch = useDispatch()
  const isMountedRef = useRef(null)
  const scrollRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true
    if (!promos) {
      dispatch(initPromos())
    }
    return () => isMountedRef.current = false
  }, [dispatch, promos])

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className='sticky-head'>
      <div style={{ width: "100%", height: 20 }}></div>
      <div className='outerDashDiv' >
        <Button className='btn' onClick={() => scroll(-400)}>
          <ChevronLeft style={{ fontSize: 50 }} />
        </Button>
        <div className='dashDiv' ref={scrollRef} >
          {promos ? promos.map(p =>
            <Grow key={p._id} in={promos !== undefined}>
              <Card elevation={7}>
                <CardContent>
                  <Typography variant='body2'>
                    {p.description}
                  </Typography>
                  <br />
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ff2f0a', color: 'white', marginTop: 'auto', paddingBottom: 20 }}>
                  <Typography variant='body1' style={{ paddingTop: 20 }}>
                    Code: <strong>{p.code}</strong>
                  </Typography>
                </CardActions>
              </Card>
            </Grow>
          )
            :
            null
          }
        </div>
        <Button className='btn' onClick={() => scroll(400)}>
          <ChevronRight style={{ fontSize: 50 }} />
        </Button>
      </div>
    </div>
  )
}
export default Promos