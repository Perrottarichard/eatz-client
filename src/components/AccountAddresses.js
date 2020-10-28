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
    <div className='account-sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Addresses</strong></Typography>
      <div className='accountDetailsDiv'>
        {addresses ? addresses.map((a, i) =>
          <Card key={a._id} className='accountDetailsCard' >
            <CardContent style={{ paddingBottom: 0, margin: 'auto' }} >
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
        <div className='accountAddDiv'>
          <IconButton aria-label="add an address" style={{ fontSize: 16, color: 'darkgray' }} onClick={() => setOpenOnClick(true)}>
            <AddBox style={{ fontSize: 30, marginRight: 10, color: 'darkgray' }} />Add Address
      </IconButton>
        </div>
        <UserAddressesModal user={user} titleMessage={``} openOnClick={openOnClick} setOpenOnClick={setOpenOnClick} />
        <EditAddressesModal user={user} titleMessage={``} editOnClick={editOnClick} setEditOnClick={setEditOnClick} />
      </div>
    </div>
  )
}
export default AccountAddresses