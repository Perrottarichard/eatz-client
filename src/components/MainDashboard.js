import React from 'react'
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

const MainDashboard = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const user = useSelector(state => state.activeUser.user)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <GeoDataList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <GeoDisplay />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <Favorites />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <Promos />
          </Paper>
        </Grid>
      </Grid>
      <UserAddressesModal user={user} titleMessage={`'Tell us where to deliver your pizza, and we'll save your information so you only have to do this once.'`} />
    </React.Fragment>

  )
}
export default MainDashboard