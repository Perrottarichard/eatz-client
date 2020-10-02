// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import GeoDisplay from '../components/GeoDisplay'
// import { getAtDashboard } from '../reducers/activeUserReducer'

// const Dashboard = ({ user }) => {

//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (user === null)
//       dispatch(getAtDashboard())
//   }, [dispatch, user])

//   return (
//     <div>
//       <GeoDisplay user={user} />
//     </div>
//   )
// }

// export default Dashboard