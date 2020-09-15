import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'

import styles from './Login.module.css'
import Input from '../../../Components/UI/Forms/Input/Input'

import Button from '../../../Components/UI/Button/Button'
import Heading from '../../../Components/UI/Heading/Heading'
import ErrorMessage from '../../../Components/UI/messages/errorMessage/ErrorMessage'
import CustomLink from '../../../Components/UI/Links/CustomLink'
import GoogleButton from '../../../Components/UI/Button/googleButton/GoogleButton'

import * as actions from '../../../store/actions'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('Email is required.'),
  password: Yup.string().required('No password provided.')
})

const Login = ({ signIn, signInGoogle, error, loading, clear }) => {
  useEffect(() => {
    return () => {
      clear()
    }
  }, [clear])

  return (
    <div className={styles.FormWrapper}>
      <Heading type="h1">Sign in </Heading>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          signIn(values)
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

            <Field
              type="password"
              name="password"
              placeholder="Password"
              component={Input}
            />
            <Button
              loading={loading}
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <CustomLink to="/recover-password">
        <Heading type="h5">Forgot your password?</Heading>
      </CustomLink>
      <GoogleButton onClick={signInGoogle} text="Sign in with Google" />
      <ErrorMessage show={error}>{error}</ErrorMessage>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  loading: auth.loading
})

const mapDispatchToProps = {
  signIn: actions.signIn,
  clear: actions.clear,
  signInGoogle: actions.signInGoogle
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
