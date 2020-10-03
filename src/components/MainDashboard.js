import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GeoDataList from './GeoDataList';
import GeoDisplay from './GeoDisplay';
import RequestPartnerForm from './RequestPartnerForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }
}))

const MainDashboard = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <GeoDataList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <GeoDisplay />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <RequestPartnerForm />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default MainDashboard