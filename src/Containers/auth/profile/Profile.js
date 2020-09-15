import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import styles from './Profile.module.css'
import Input from '../../../Components/UI/Forms/Input/Input'
import Button from '../../../Components/UI/Button/Button'
import Heading from '../../../Components/UI/Heading/Heading'
import ErrorMessage from '../../../Components/UI/messages/errorMessage/ErrorMessage'
import SuccessMessage from '../../../Components/UI/messages/successMessage/SuccessMessage'
import Modal from '../../../Components/UI/Modal/Modal'

import * as actions from '../../../store/actions'

const Profilechema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short.')
    .max(50, 'Too Long.')
    .required('Your name is required.'),
  lastName: Yup.string()
    .min(2, 'Too Short.')
    .max(50, 'Too Long.')
    .required('Your last name is required.'),
  email: Yup.string().email('Invalid email.').required('Email is required.'),
  password: Yup.string().min(
    8,
    'Password is too short - should be 8 chars minimum.'
  ),
  passwordConfirmation: Yup.string().when('password', {
    is: (val) => val.length > 0,
    then: Yup.string()
      .required('You have to re-type your password.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
  })
})

const Profile = ({
  clear,
  error,
  firebase,
  updateProfile,
  loading,
  deleteUser,
  deleteUserError,
  deleteUserLoading
}) => {
  const [deleteOpened, setDeleteOpened] = useState(false)
  useEffect(() => {
    return () => {
      clear()
    }
  }, [clear])
  if (!firebase.profile.isLoaded) return null
  return (
    <div className={styles.FormWrapper}>
      <Heading type="h1">Edit your Profile</Heading>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={Profilechema}
        onSubmit={(values, { setSubmitting }) => {
          updateProfile(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.Form}>
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
              component={Input}
            />

            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
              component={Input}
            />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              component={Input}
            />

            <Field
              type="password"
              name="password"
              placeholder="New password"
              component={Input}
            />

            <Field
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm New password"
              component={Input}
            />

            <Button
              loading={loading}
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Edit
            </Button>
          </Form>
        )}
      </Formik>
      <SuccessMessage show={!loading && error === false}>
        Profile Updated
      </SuccessMessage>
      <ErrorMessage show={error}>{error}</ErrorMessage>
      <div onClick={() => setDeleteOpened(true)} className={styles.Delete}>
        Delete my account
      </div>

      <Modal opened={deleteOpened} close={() => setDeleteOpened(false)}>
        <div className={styles.ModalWrapper}>
          <Heading type="h5">
            Are you sure you want to delete your account?
          </Heading>
          <ErrorMessage show={deleteUserError}>{deleteUserError}</ErrorMessage>
          <div className={styles.buttonWrapper}>
            <Button
              onClick={() => deleteUser()}
              loading={deleteUserLoading}
              red
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteOpened(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  error: auth.profile.error,
  loading: auth.profile.loading,
  deleteUserError: auth.deleteUser.error,
  deleteUserLoading: auth.deleteUser.loading
})

const mapDispatchToProps = {
  updateProfile: actions.updateProfile,
  deleteUser: actions.deleteUser,
  clear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
