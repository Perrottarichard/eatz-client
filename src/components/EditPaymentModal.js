import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import { editPaymentInfo } from '../reducers/activeUserReducer'

const EditPaymentModal = ({ user, titleMessage, editPaymentOnClick, setEditPaymentOnClick }) => {

  const dispatch = useDispatch()
  const paymentInfoToEdit = user.paymentInfoArray[editPaymentOnClick.indexToEdit]
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (editPaymentOnClick.isOpen) {
      setModalOpen(true)
    }
  }, [setModalOpen, editPaymentOnClick])

  const handleModalClose = () => {
    setModalOpen(false)
    setEditPaymentOnClick(false)
  };

  return (
    <div >
      {modalOpen ?
        <Dialog open={modalOpen} onClose={handleModalClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{titleMessage}</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                ...paymentInfoToEdit
              }}
              validate={values => {
                const errors = {};
                if (!values.creditCardNumber) {
                  errors.creditCardNumber = 'Required'
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
                dispatch(editPaymentInfo(user._id, {
                  creditCardNumber: values.creditCardNumber,
                  creditCardExpire: values.creditCardExpire,
                  creditCardType: values.creditCardType,
                  creditCardNameOnCard: values.creditCardNameOnCard,
                  creditCardCVV: values.creditCardCVV,
                }))
                handleModalClose()
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
                  <form style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} onSubmit={handleSubmit}>
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
                      type="number"
                      label='Card Number'
                      name="creditCardNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditCardNumber}
                      error={errors.creditCardNumber && touched.creditCardNumber ? true : false}
                      helperText={errors.creditCardNumber && touched.creditCardNumber && errors.creditCardNumber}
                      style={{ margin: 10 }}
                    />

                    <TextField
                      type="text"
                      label='Expires:'
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
                      label='Card Type:'
                      name="creditCardType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditCardType}
                      error={errors.creditCardType && touched.creditCardType ? true : false}
                      helperText={errors.creditCardType && touched.creditCardType && errors.creditCardType}
                      style={{ margin: 10 }}
                    />
                    <TextField
                      type="text"
                      label='CVV:'
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
                        <Button onClick={handleModalClose} color="default">
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
export default EditPaymentModal