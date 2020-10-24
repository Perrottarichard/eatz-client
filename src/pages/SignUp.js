import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import pizzapizza from '../assets/pizzapizza100.png'
import { Formik } from 'formik'
import { register } from '../reducers/activeUserReducer'
import { Redirect } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab'
import { closeNotify } from '../reducers/activeUserReducer'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '95%'
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const redirectTo = useSelector(state => state.activeUser.redirectTo)
  const notify = useSelector(state => state.activeUser.notify)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img alt='pizza' src={pizzapizza}></img>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validate={values => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = 'Required'
            }
            else if (!values.lastName) {
              errors.lastName = 'Required'
            }
            else if (!values.email) {
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
            dispatch(register({
              firstName: values.firstName,
              lastName: values.lastName,
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
                  label='First Name'
                  name="firstName"
                  fullWidth
                  variant='outlined'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={errors.firstName && touched.firstName ? true : false}
                  helperText={errors.firstName && touched.firstName && errors.firstName}
                  style={{ margin: 10 }}
                />
                <TextField
                  type="text"
                  label='Last Name'
                  name="lastName"
                  fullWidth
                  variant='outlined'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={errors.lastName && touched.lastName ? true : false}
                  helperText={errors.lastName && touched.lastName && errors.lastName}
                  style={{ margin: 10 }}
                />

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
                  Sign Up
          </Button>
                { redirectTo === '/' ? <Redirect to={redirectTo} /> : null}
                <Grid container justify="center">
                  <Grid item>
                    <Link href="/" variant="body2" style={{ color: '#ff2f0a' }}>
                      Already have an account? Sign in
              </Link>
                  </Grid>
                </Grid>
              </form>
            )}
        </Formik>
        <Snackbar
          open={notify && notify.open}
          autoHideDuration={2000}
          onClose={() => dispatch(closeNotify())}>
          {notify && notify.open ?
            <Alert severity={notify.severity} style={notify.severity === 'success' ? { backgroundColor: '#b7e89e', border: 'solid', borderColor: 'green', width: 260 } : { backgroundColor: 'lightgrey', border: 'solid', borderColor: 'red', width: 260 }} >
              {notify.message}
            </Alert>
            : null}
        </Snackbar>
      </div>
    </Container >
  );
}