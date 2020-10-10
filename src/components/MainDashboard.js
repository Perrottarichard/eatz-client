import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GeoDataList from './GeoDataList';
import GeoDisplay from './GeoDisplay';
import RequestPartnerForm from './RequestPartnerForm';
import Favorites from './Favorites';

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
          <RequestPartnerForm />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default MainDashboard