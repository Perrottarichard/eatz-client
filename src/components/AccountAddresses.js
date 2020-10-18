import React, { useState } from 'react'
import { Card, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { AddBox, Edit } from '@material-ui/icons';
import UserAddressesModal from './UserAddressesModal';
import EditAddressesModal from './EditAddressModal';


const AccountAddresses = ({ user }) => {

  const addresses = user.addresses
  const [openOnClick, setOpenOnClick] = useState(false)
  const [editOnClick, setEditOnClick] = useState({
    isOpen: false,
    indexToEdit: null
  })

  const handleEditAddress = (addressIndex) => {
    setEditOnClick({
      isOpen: true,
      indexToEdit: addressIndex
    })
  }
  return (
    <div >
      <h5 className='sticky-head'>Addresses
      </h5>
      {addresses ? addresses.map((a, i) =>
        <Card key={a._id} style={{ marginBottom: 10 }} >
          <CardContent >
            <Typography variant='body1' color="textPrimary">
              {a.locationName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {a.addressNumber} {a.street}
            </Typography >
            <Typography variant="body2" color="textSecondary" component="p">
              {a.city}, {a.state},  {a.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {a.zip}
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'block' }}>
            <IconButton aria-label="edit address" onClick={() => handleEditAddress(i)} style={{ color: 'rgb(221, 68, 68)', float: 'right', padding: 6, marginRight: 20, fontSize: 16 }}>
              <Edit style={{ marginRight: 10, float: 'right' }} />Edit
            </IconButton>
          </CardActions>
        </Card>
      )
        : null}
      <IconButton aria-label="add an address" style={{ fontSize: 16, color: 'white' }} onClick={() => setOpenOnClick(true)}>
        <AddBox style={{ fontSize: 30, marginRight: 10 }} />Add
      </IconButton>
      <UserAddressesModal user={user} titleMessage={`Be sure to use a descriptive name`} openOnClick={openOnClick} setOpenOnClick={setOpenOnClick} />
      <EditAddressesModal user={user} titleMessage={``} editOnClick={editOnClick} setEditOnClick={setEditOnClick} />
    </div>
  )
}
export default AccountAddresses