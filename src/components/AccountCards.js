import React, { useState } from 'react'
import { Card, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { AddBox, Edit } from '@material-ui/icons';
import AddPaymentModal from './AddPaymentModal';
import EditPaymentModal from './EditPaymentModal';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AccountCards = ({ user }) => {

  const paymentInfoArray = user.paymentInfoArray
  const [openPaymentOnClick, setOpenPaymentOnClick] = useState(false)
  const [editPaymentOnClick, setEditPaymentOnClick] = useState({
    isOpen: false,
    indexToEdit: null
  })

  const handleEditPaymentInfo = (addressIndex) => {
    setEditPaymentOnClick({
      isOpen: true,
      indexToEdit: addressIndex
    })
  }
  return (
    <div className='account-sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Credit/Debit Cards</strong></Typography>
      <div className='accountDetailsDiv'>
        {paymentInfoArray ? paymentInfoArray.map((a, i) =>
          <Card key={a._id} className='accountDetailsCard' >
            <CardContent style={{ paddingBottom: 0 }} >
              <Typography variant='body1' color="textPrimary">
                {a.creditCardNameOnCard}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {a.creditCardType} {a.creditCardExpire}
              </Typography >
              <Typography variant="body2" color="textSecondary" component="p">
                {a.creditCardNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {a.creditCardCVV}
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'block' }}>
              <IconButton aria-label="edit address" onClick={() => handleEditPaymentInfo(i)} style={{ color: 'rgb(221, 68, 68)', float: 'right', padding: 6, marginRight: 20, fontSize: 16 }}>
                <Edit style={{ marginRight: 10, float: 'right' }} />Edit
            </IconButton>
            </CardActions>
          </Card>
        )
          : null}
        <div className='accountAddDiv'>
          <IconButton aria-label="add an address" style={{ fontSize: 16, color: 'darkgray' }} onClick={() => setOpenPaymentOnClick(true)}>
            <AddBox style={{ fontSize: 30, marginRight: 10, color: 'darkgray' }} />Add Card
      </IconButton>
        </div>
        <AddPaymentModal user={user} titleMessage={``} openPaymentOnClick={openPaymentOnClick} setOpenPaymentOnClick={setOpenPaymentOnClick} />
        <EditPaymentModal user={user} titleMessage={``} editPaymentOnClick={editPaymentOnClick} setEditPaymentOnClick={setEditPaymentOnClick} />
      </div>
    </div>
  )
}
export default AccountCards