import React from 'react';
import { Switch, Route } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../components/ListItems';
// import GeoDisplay from '../components/GeoDisplay';
import { useSelector, useDispatch } from 'react-redux'
// import GeoDataList from '../components/GeoDataList';
import logo from '../assets/pizzapizza50trans.png'
import { clearUser } from '../reducers/activeUserReducer'
// import RequestPartnerForm from '../components/RequestPartnerForm';
// import PlaceDetails from '../components/PlaceDetails';
import PlaceDetails from '../components/PlaceDetails';
import MainDashboard from '../components/MainDashboard';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#575551'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    backgroundColor: 'white',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.activeUser.user)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(clearUser())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            <img src={logo} alt='logo'></img>
          </div>
          <IconButton color="inherit" edge='end' style={{ width: 150 }}>
            {user ?
              <div>
                <span>
                  <Avatar style={{ float: 'left' }} src={user.image} alt='user'></Avatar>
                  <MenuItem style={{ color: 'black', float: 'right' }} onClick={logout}>Logout</MenuItem>
                </span>
              </div>
              :
              null}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={window.innerWidth >= 500 ? 'permanent' : 'temporary'}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path='/dashboard' component={MainDashboard} />
            <Route exact path='/dashboard/:id' component={PlaceDetails} />
            <Route exact path='/dashboard/myorders' />
          </Switch>
        </Container>
      </main>

    </div>
  );
}