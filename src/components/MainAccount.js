import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GeoDataList from './GeoDataList';
import GeoDisplay from './GeoDisplay';
import Favorites from './Favorites';
import Promos from './Promos';
import UserAddressesModal from './UserAddressesModal';
import AccountInfo from './AccountInfo';
import AccountAddresses from './AccountAddresses';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 280,
  }
}))

const MainAccount = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const user = useSelector(state => state.activeUser.user)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AccountInfo user={user} />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <AccountAddresses user={user} />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid> */}
      </Grid>
      <UserAddressesModal user={user} titleMessage={`'Tell us where to deliver your pizza, and we'll save your information so you only have to do this once.'`} />
    </React.Fragment>

  )
}
export default MainAccount