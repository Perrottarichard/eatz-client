import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Container } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Pizza from './Pizza';
import Beverage from './Beverage';

const PlaceMenu = ({ items, place }) => {
  const user = useSelector(state => state.activeUser.user)
  const beverages = items.filter(i => i.type === 'beverages')
  const pizza = items.filter(i => i.type === 'pizza')
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory()

  function getSteps() {
    return ['Build your pizzas', '...and to drink?'];
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Pizza pizza={pizza} place={place} user={user} />
      case 1:
        return <Beverage beverages={beverages} user={user} place={place} />
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

  const handleReset = () => {
    setActiveStep(0);
  };
  const sendToCart = () => {
    history.push('/dashboard/cart')
  }

  if (!place.opening_hours.open_now) {
    return (
      <div>
        <h5 className='sticky-head'>Menu</h5>
        <Container>
          <Typography variant='h6' component='h6'>
            Sorry, this restaurant is closed. Come back again during operating hours to view the menu and place an order.
        </Typography>
        </Container>
      </div>
    )
  }

  return (
    <React.Fragment>
      <h5 className='sticky-head'>Menu</h5>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography >All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div style={{ textAlign: 'center' }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ marginRight: 20, marginBottom: 20, marginTop: 20 }}
                >
                  Back
              </Button>
                <Button style={{ border: 'solid', borderWeight: 1, borderColor: '#ff430a', backgroundColor: '#575551', color: 'white', marginBottom: 20, marginTop: 20, marginLeft: 20 }} variant="contained" onClick={activeStep === steps.length - 1 ? () => sendToCart() : handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
      </div>
    </React.Fragment>
  )
}
export default PlaceMenu