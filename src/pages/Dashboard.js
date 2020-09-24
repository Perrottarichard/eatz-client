import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAtDashboard } from '../reducers/activeUserReducer'

const Dashboard = ({ user }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (user === null)
      dispatch(getAtDashboard())
  }, [dispatch, user])

  return (
    <div>
      {user.firstName.concat("'s")} Dashboard
    </div>
  )
}

export default Dashboard