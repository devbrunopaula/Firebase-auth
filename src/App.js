import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from './Hoc/Layout/Layout'
import Home from './Containers/Home/Home'
import ExampleContainer from './Containers/ExampleContainer/ExampleContainer'
import Login from './Containers/auth/login/Login'
import SignUp from './Containers/auth/signup/Signup'
import Profile from './Containers/auth/profile/Profile'
import Logout from './Containers/auth/Logout/Logout'
import VerifyEmail from './Containers/auth/verifyEmail/VerifyEmail'
import RecoverPassword from './Containers/auth/recoverPassword/RecoverPassword'

function App({auth}) {
  let routes

  // logged but not verified
  if (auth.uid && auth.emailVerified === true) {
    routes = (
      <Switch>
        <Route exact path='/verify-email' component={VerifyEmail} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/logout' component={Logout} />
        <Redirect to='/verify-email' />
      </Switch>
    )
  } else if (auth.uid) {
    // logged routes
    routes = (
      <Switch>
        <Route exact path='/protected' component={ExampleContainer} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    )
  }

  // not logged routes
  else {
    routes = (
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/recover-password' component={RecoverPassword} />
        <Route exact path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return <Layout>{routes}</Layout>
}

const mapStateToProps = ({firebase}) => ({
  auth: firebase.auth,
})

export default connect(mapStateToProps)(App)
