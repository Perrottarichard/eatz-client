import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import pizzapizza from '../assets/pizzapizza100.png'
import pizzaBackground from '../assets/pizzapizzalarge.jpg'
import { isAuthenticated, signIn } from '../reducers/activeUserReducer'
import { Formik } from 'formik'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab'
import { closeNotify } from '../reducers/activeUserReducer'


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
    width: '96%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    width: '96%'
  },
}));

export default function LandingPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const notify = useSelector(state => state.activeUser.notify)

  useEffect(() => {
    dispatch(isAuthenticated())
  }, [dispatch])

  const authWithGoogle = () => {
    window.open("http://localhost:3001/auth/google", "_self");
    // window.open("https://pizzapizzadelivery.herokuapp.com/auth/google", "_self");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={pizzapizza} alt='pizza big' />
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <form className={classes.form} noValidate>
            <Button
              onClick={authWithGoogle}
              variant="contained"
              className={classes.submit}
              style={{ backgroundColor: '#ff2f0a', color: 'white', height: 60, width: '100%' }}
            >
              <FontAwesomeIcon icon={faGoogle} style={{ fontSize: 30, marginRight: 20, color: 'white' }} />Continue with Google
            </Button>
          </form>

          <div className="separator"> or </div>
          <br />


          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required'
              }
              else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
              }
              else if (!values.password) {
                errors.password = 'Required'
              }
              else if (!/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(values.password)) {
                errors.password = 'Password must be 6 characters long, and must not contain any special characters'
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true)
              dispatch(signIn({
                email: values.email,
                password: values.password
              }))
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
                <form style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    label='Email'
                    name="email"
                    fullWidth
                    variant='outlined'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email ? true : false}
                    helperText={errors.email && touched.email && errors.email}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    type="password"
                    label='Password'
                    name="password"
                    fullWidth
                    variant='outlined'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                    helperText={errors.password && touched.password && errors.password}
                    style={{ margin: 10 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    className={classes.submit}
                  >
                    Sign In
          </Button>
                  <Grid container justify="center">
                    <Grid item>
                      <Link href="/signup" variant="body2" style={{ color: '#ff2f0a' }}>
                        Don't have an account? Sign Up
              </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
          </Formik>
        </div>
        <Snackbar
          open={notify && notify.open}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={() => dispatch(closeNotify())}>
          {notify && notify.open ?
            <Alert severity={notify.severity} style={notify.severity === 'success' ? { backgroundColor: 'white', border: 'solid', borderColor: 'green', width: 260 } : { backgroundColor: 'lightgrey', border: 'solid', borderColor: 'red', width: 260 }} >
              {notify.message}
            </Alert>
            : null}
        </Snackbar>
      </Grid>
    </Grid>
  );
}