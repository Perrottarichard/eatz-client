import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Card, CardContent } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Pizza from './Pizza';
import Beverage from './Beverage';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  stepper: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
}))

const PlaceMenu = ({ items, place }) => {
  const classes = useStyles()
  const user = useSelector(state => state.activeUser.user)
  const beverages = items.filter(i => i.type === 'beverages')
  const pizza = items.filter(i => i.type === 'pizza')
  const [activeStep, setActiveStep] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const getSteps = () => {
    return ['Build your pizzas...', '...and to drink?'];
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Pizza pizza={pizza} place={place} user={user} />
      case 1:
        return <Beverage beverages={beverages} user={user} place={place} setOpen={setOpen} sendToCart={sendToCart} />
      default:
        return 'Unknown stepIndex';
    }
  }
  const steps = getSteps();


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //settimeout to avoid transition error with tabpanel/box/stepper render conflicts
  const sendToCart = () => {
    setTimeout(() => {
      history.push('/dashboard/cart')
    }, 1000);
  }

  if (!place.opening_hours.open_now) {
    return (
      <div className='placeDetailsDiv'>
        {place !== undefined ?
          <Card className='placeDetailsCard'>
            <CardContent>
              <Typography variant='body1' color='textPrimary'>Sorry, this restaurant is closed.</Typography>
              <br />
            </CardContent>
          </Card>
          : <h3>Loading...</h3>}
      </div>
    )
  }

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? sendToCart() : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <div style={{ textAlign: 'center', backgroundColor: 'white' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                style={activeStep !== 0 ? { marginRight: 15, marginBottom: 20, marginTop: 20, backgroundColor: 'white', color: 'black', width: 100, border: 'solid', borderColor: 'black', borderWidth: 2 } : { display: 'none' }}
              >
                <ChevronLeftOutlined />
              </Button>
              <Button style={{ marginBottom: 20, marginTop: 20, marginLeft: 15, backgroundColor: 'white', color: 'black', width: 100, border: 'solid', borderColor: 'black', borderWidth: 2 }} color='primary' variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : <ChevronRightOutlined />}
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}
export default PlaceMenu