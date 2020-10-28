import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import AccountInfo from './AccountInfo';
import AccountAddresses from './AccountAddresses';
import AccountCards from './AccountCards';

const MainAccount = () => {

  const user = useSelector(state => state.activeUser.user)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <AccountInfo user={user} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <AccountAddresses user={user} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <AccountCards user={user} />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid> */}
      </Grid>
    </React.Fragment>

  )
}
export default MainAccount