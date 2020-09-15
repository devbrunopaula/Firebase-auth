import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// var config = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: 'authentication-boilerpla-ef1f4.firebaseapp.com',
//   databaseURL: 'https://authentication-boilerpla-ef1f4.firebaseio.com',
//   projectId: 'authentication-boilerpla-ef1f4',
//   storageBucket: 'authentication-boilerpla-ef1f4.appspot.com',
//   messagingSenderId: '10190348624'
// }

const config1 = {
  apiKey: 'AIzaSyCH6jaNYtC2lRwBpZs5kywwjlpih705W1E',
  authDomain: 'react-login-f515c.firebaseapp.com',
  databaseURL: 'https://react-login-f515c.firebaseio.com',
  projectId: 'react-login-f515c',
  storageBucket: 'react-login-f515c.appspot.com',
  messagingSendId: '1:338096054980:web:175ada87646baae8139f91'
}

firebase.initializeApp(config1)
firebase.firestore()

export default firebase
