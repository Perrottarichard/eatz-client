import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import pizzapizza from '../assets/pizzapizza200.png'
import pizzaBackground from '../assets/pizzapizzalarge.jpg'
import { isAuthenticated } from '../reducers/activeUserReducer'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${pizzaBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0.5),
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isAuthenticated())
  }, [dispatch])

  const authWithGoogle = () => {
    // window.open("http://localhost:3001/auth/google", "_self");
    window.open("https://pizzapizzadeliver.herokuapp.com/auth/google", "_self");
  }
  // const authWithFacebook = () => {
  //   window.open("http://localhost:3001/auth/facebook", "_self");
  // }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={pizzapizza} alt='pizza' />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Button
              onClick={authWithGoogle}
              fullWidth
              variant="contained"
              className={classes.submit}
              style={{ backgroundColor: '#de5246', color: 'white', height: 60 }}
            >
              <FontAwesomeIcon icon={faGoogle} style={{ fontSize: 30, marginRight: 20, color: 'white' }} />Continue with Google
            </Button>
            {/* <Button
              onClick={authWithFacebook}
              fullWidth
              variant="contained"
              style={{ backgroundColor: '#3b5998', color: 'white', height: 60 }}
              className={classes.submit}
              disabled={true}
            >
              <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 30, marginRight: 20 }} />
              <small style={{ fontSize: 9 }}>under construction</small>
            </Button> */}
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button> */}
            {/* <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}