import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isAuthenticated } from '../reducers/activeUserReducer'

const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isAuthenticated())
  }, [dispatch])

  return (
    <div>
      This is your dashboard
    </div>
  )
}

export default Dashboard