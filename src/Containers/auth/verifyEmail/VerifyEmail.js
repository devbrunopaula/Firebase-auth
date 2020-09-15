import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './VerifyEmail.module.css'
import Paragraph from '../../../Components/UI/paragraph/Paragraph'
import Button from '../../../Components/UI/Button/Button'
import Heading from '../../../Components/UI/Heading/Heading'
import ErrorMessage from '../../../Components/UI/messages/errorMessage/ErrorMessage'
import SuccessMessage from '../../../Components/UI/messages/successMessage/SuccessMessage'

import * as actions from '../../../store/actions'

const VerifyEmail = ({ clear, sendVerification, error, loading }) => {
  useEffect(() => {
    return () => {
      clear()
    }
  }, [clear])
  return (
    <div className={styles.Wrapper}>
      <Heading type="h3">Account not verified</Heading>
      <div className={styles.textWrapper}>
        <Paragraph>Your email is not verified.</Paragraph>
        <Paragraph>
          Check your email, you should have a verification email.
        </Paragraph>
      </div>
      <Heading type="h5">Don't see it?</Heading>

      <Button loading={loading} onClick={sendVerification}>
        Send again
      </Button>
      <SuccessMessage show={!loading && error === false}>
        Verification email sent.
      </SuccessMessage>
      <ErrorMessage show={error}>{error}</ErrorMessage>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({
  error: auth.verificationEmail.error,
  loading: auth.verificationEmail.loading
})

const mapDispatchToProps = {
  sendVerification: actions.sendVerificationEmail,
  clear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
