import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import { addAddress } from '../reducers/activeUserReducer'

const UserAddressesModal = ({ user, titleMessage }) => {

  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(user.addresses.length === 0);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div >
      <Dialog open={modalOpen} onClose={handleModalClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{titleMessage}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              locationName: 'Home',
              addressNumber: '',
              street: '',
              city: '',
              state: '',
              country: '',
              zip: '',
              specialInstructions: ''
            }}
            validate={values => {
              const errors = {};
              if (!values.locationName) {
                errors.locationName = 'Required'
              }
              if (!values.addressNumber) {
                errors.addressNumber = 'Required'
              }
              if (!values.street) {
                errors.street = 'Required'
              }
              if (!values.city) {
                errors.city = 'Required'
              }
              if (!values.state) {
                errors.state = 'Required'
              }
              if (!values.country) {
                errors.country = 'Required'
              }
              if (!values.zip) {
                errors.zip = 'Required'
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true)
              dispatch(addAddress(user._id, {
                locationName: values.locationName,
                addressNumber: values.addressNumber,
                street: values.street,
                city: values.city,
                state: values.state,
                country: values.country,
                zip: values.zip,
                specialInstructions: values.specialInstructions
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
                    label='Location Name'
                    name="locationName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.locationName}
                    error={errors.locationName && touched.locationName ? true : false}
                    helperText={errors.locationName && touched.locationName && errors.locationName}
                    style={{ margin: 10 }}
                  />
                  {/* {errors.locationName && touched.locationName && errors.locationName} */}
                  <TextField
                    type="number"
                    label='Building Number'
                    name="addressNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.addressNumber}
                    error={errors.addressNumber && touched.addressNumber ? true : false}
                    helperText={errors.addressNumber && touched.addressNumber && errors.addressNumber}
                    style={{ margin: 10 }}
                  />

                  <TextField
                    type="text"
                    label='Street'
                    name="street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                    error={errors.street && touched.street ? true : false}
                    helperText={errors.street && touched.street && errors.street}
                    style={{ margin: 10 }}
                  />

                  <TextField
                    type="text"
                    label='City/Town'
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    error={errors.city && touched.city ? true : false}
                    helperText={errors.city && touched.city && errors.city}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    type="text"
                    label='State/Province'
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    error={errors.state && touched.state ? true : false}
                    helperText={errors.state && touched.state && errors.state}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    type="text"
                    label='Country'
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    error={errors.country && touched.country ? true : false}
                    helperText={errors.country && touched.country && errors.country}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    type="text"
                    label='Zip Code'
                    name="zip"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip}
                    error={errors.zip && touched.zip ? true : false}
                    helperText={errors.zip && touched.zip && errors.zip}
                    style={{ margin: 10 }}
                  />

                  <TextField
                    type="text"
                    label='Special instructions?'
                    name="specialInstructions"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.specialInstructions}
                    helperText={errors.specialInstructions && touched.specialInstructions && errors.specialInstructions}
                    style={{ margin: 10 }}
                  />
                  <div style={{ display: 'block', width: '100%', marginTop: 20 }}>
                    <DialogActions>
                      <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                      <Button type='submit' color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                  </div>
                </form>
              )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default UserAddressesModal