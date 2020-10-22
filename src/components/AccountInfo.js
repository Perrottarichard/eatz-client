
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const AccountInfo = ({ user }) => {
  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Information</strong></Typography>
      <div className='accountDetailsDiv'>
        {user !== undefined ?
          <Card className='accountDetailsCard'>
            <CardContent>
              <Typography variant='body1' color='textPrimary'>{user.firstName}</Typography>
              <Typography variant='body2' color='textSecondary'>{user.email}</Typography>
              <Typography variant='body2' color='textSecondary'>Payment method: Cash on delivery</Typography>
              <Typography variant='body2' color='textSecondary'>Registered via {user.googleId ? 'Google' : 'local email/password creation'} on {new Date(user.createdAt).toString().slice(0, 25)}</Typography>
            </CardContent>
          </Card>
          : <h3>Loading...</h3>}
      </div>
    </div>
  )
}

export default AccountInfo
