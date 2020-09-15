import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'

import styles from './RecoverPassword.module.css'
import Input from '../../../Components/UI/Forms/Input/Input'
import Button from '../../../Components/UI/Button/Button'
import Heading from '../../../Components/UI/Heading/Heading'
import ErrorMessage from '../../../Components/UI/messages/errorMessage/ErrorMessage'
import SuccessMessage from '../../../Components/UI/messages/successMessage/SuccessMessage'

import * as actions from '../../../store/actions'

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('Email is required.')
})

const RecoverPassword = ({ clear, resetPassword, error, loading }) => {
  useEffect(() => {
    return () => {
      clear()
    }
  }, [clear])
  return (
    <div className={styles.FormWrapper}>
      <Heading type="h1">Recover your password</Heading>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.Form}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              component={Input}
            />

            <Button
              loading={loading}
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Recover
            </Button>
          </Form>
        )}
      </Formik>
      <SuccessMessage show={!loading && error === false}>
        Check your email to recover your password.
      </SuccessMessage>
      <ErrorMessage show={error}>{error}</ErrorMessage>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({
  error: auth.passwordRecovery.error,
  loading: auth.passwordRecovery.loading
})

const mapDispatchToProps = {
  resetPassword: actions.resetPassword,
  clear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)
