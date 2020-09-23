import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAtDashboard } from '../reducers/activeUserReducer'



const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAtDashboard())
  }, [dispatch])

  return (
    <div>
      This is your dashboard
    </div>
  )
}

export default Dashboard