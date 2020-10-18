import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Collapse from '@material-ui/core/Collapse';
import { Typography, Container } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Pizza from './Pizza';
import Beverage from './Beverage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }
}))

const PlaceMenu = ({ items, place }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const user = useSelector(state => state.activeUser.user)
  const beverages = items.filter(i => i.type === 'beverages')
  const pizza = items.filter(i => i.type === 'pizza')
  const [activeStep, setActiveStep] = useState(0)
  const [open, setOpen] = useState(false)
  const history = useHistory()

  //handle collapsable menu
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  //handle confirmation dialog
  const handleClickOpen = () => {
    setOpen(true);
  }
  const getSteps = () => {
    return ['Build your pizzas', '...and to drink?'];
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Pizza pizza={pizza} place={place} user={user} handleClickOpen={handleClickOpen} open={open} setOpen={setOpen} handleNext={handleNext} handleExpandClick={handleExpandClick} expanded={expanded} setExpanded={setExpanded} />
      case 1:
        return <Beverage beverages={beverages} user={user} place={place} handleClickOpen={handleClickOpen} open={open} setOpen={setOpen} handleNext={handleNext} sendToCart={sendToCart} />
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

  const sendToCart = () => {
    history.push('/dashboard/cart')
  }

  if (!place.opening_hours.open_now) {
    return (
      <div>
        <h5 className='sticky-head'>Order</h5>
        <Container>
          <Typography variant='body1'>
            Sorry, this restaurant is closed.
        </Typography>
        </Container>
      </div>
    )
  }

  return (
    <React.Fragment>
      <h5 className='sticky-head'>Order</h5>
      <div style={{ textAlign: 'center' }}>
        <Button
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          startIcon={<ExpandMoreIcon />}
        >
          Order Now!
        </Button>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stepper activeStep={activeStep} alternativeLabel>
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
              <div style={{ textAlign: 'center' }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ marginRight: 20, marginBottom: 20, marginTop: 20 }}
                >
                  Back
              </Button>
                <Button style={{ marginBottom: 20, marginTop: 20, marginLeft: 20 }} color='default' variant="outlined" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </Collapse>
    </React.Fragment>
  )
}
export default PlaceMenu