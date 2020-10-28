import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import { addPaymentInfo } from '../reducers/activeUserReducer'
import { faCcAmex, faCcDiscover, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPaymentModal = ({ user, titleMessage, openPaymentOnClick, setOpenPaymentOnClick }) => {

  const dispatch = useDispatch()

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (openPaymentOnClick) {
      setPaymentModalOpen(true)
    }
  }, [setPaymentModalOpen, openPaymentOnClick])

  const handlePaymentModalClose = () => {
    setPaymentModalOpen(false)
    setOpenPaymentOnClick(false)
  }
  const formatNumber = (number) => {
    //the numbers in this array represent the indexes at which to add a dash(-)
    let dashify = [4, 9, 14]
    if (dashify.includes(number.length)) {
      number = number + '-'
    }
    return number
  }

  return (
    <div >
      {paymentModalOpen ?
        <Dialog open={paymentModalOpen} onClose={handlePaymentModalClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{titleMessage}</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={
                {
                  creditCardNumber: '',
                  creditCardExpire: '',
                  creditCardType: '',
                  creditCardNameOnCard: '',
                  creditCardCVV: ''
                }
              }
              validate={values => {
                const errors = {};
                if (!values.creditCardNumber) {
                  errors.creditCardNumber = 'Required'
                } else if (!/^\d{4}([-]?)((\d{6}\1?\d{5})|(\d{4}\1?\d{4}\1?\d{4}))$/i.test(values.creditCardNumber)) {
                  errors.creditCardNumber = 'Invalid card number'
                }
                if (!values.creditCardExpire) {
                  errors.creditCardExpire = 'Required'
                }
                if (!values.creditCardType) {
                  errors.creditCardType = 'Required'
                }
                if (!values.creditCardNameOnCard) {
                  errors.creditCardNameOnCard = 'Required'
                }
                if (!values.creditCardCVV) {
                  errors.creditCardCVV = 'Required'
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                dispatch(addPaymentInfo(user._id, {
                  creditCardNumber: values.creditCardNumber,
                  creditCardExpire: values.creditCardExpire,
                  creditCardType: values.creditCardType,
                  creditCardNameOnCard: values.creditCardNameOnCard,
                  creditCardCVV: values.creditCardCVV,
                }))
                handlePaymentModalClose()
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
                /* and other goodies */
              }) => (
                  <form style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} onSubmit={handleSubmit}>

                    <RadioGroup aria-label="style" name="Style" value={values.creditCardType} onChange={handleChange} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexBasis: '100%' }}>

                      <FormControlLabel name='creditCardType'

                        control={<Radio style={{ color: '#575551' }} value='visa' />}
                        label={<FontAwesomeIcon icon={faCcVisa} />} />


                      <FormControlLabel name='creditCardType'

                        control={<Radio style={{ color: '#575551' }} value='mastercard' />}
                        label={<FontAwesomeIcon icon={faCcMastercard} />} />

                      <FormControlLabel name='creditCardType'

                        control={<Radio style={{ color: '#575551' }} value='discover' />}
                        label={<FontAwesomeIcon icon={faCcDiscover} />} />

                      <FormControlLabel name='creditCardType'

                        control={<Radio style={{ color: '#575551' }} value='amex' />}
                        label={<FontAwesomeIcon icon={faCcAmex} />} />


                    </RadioGroup>
                    <br />
                    <TextField
                      type="text"
                      label='Name on Card'
                      name="creditCardNameOnCard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditCardNameOnCard}
                      error={errors.creditCardNameOnCard && touched.creditCardNameOnCard ? true : false}
                      helperText={errors.creditCardNameOnCard && touched.creditCardNameOnCard && errors.creditCardNameOnCard}
                      style={{ margin: 10 }}
                    />
                    <TextField
                      type="text"
                      label='Card Number'
                      name="creditCardNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={formatNumber(values.creditCardNumber)}
                      error={errors.creditCardNumber && touched.creditCardNumber ? true : false}
                      helperText={errors.creditCardNumber && touched.creditCardNumber && errors.creditCardNumber}
                      style={{ margin: 10 }}
                    />

                    <TextField
                      type="text"
                      label='Expires'
                      name="creditCardExpire"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditCardExpire}
                      error={errors.creditCardExpire && touched.creditCardExpire ? true : false}
                      helperText={errors.creditCardExpire && touched.creditCardExpire && errors.creditCardExpire}
                      style={{ margin: 10 }}
                    />

                    <TextField
                      type="text"
                      label='CVV'
                      name="creditCardCVV"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditCardCVV}
                      error={errors.creditCardCVV && touched.creditCardCVV ? true : false}
                      helperText={errors.creditCardCVV && touched.creditCardCVV && errors.creditCardCVV}
                      style={{ margin: 10 }}
                    />
                    <div style={{ display: 'block', width: '100%', marginTop: 20 }}>
                      <DialogActions>
                        <Button onClick={handlePaymentModalClose} color="default">
                          Cancel
                    </Button>
                        <Button type='submit' variant='contained' style={{ backgroundColor: '#ff2f0a', color: 'white' }}>
                          Submit
                    </Button>
                      </DialogActions>
                    </div>
                  </form>
                )}
            </Formik>
          </DialogContent>
        </Dialog>
        : null}
    </div>
  )
}
export default AddPaymentModal