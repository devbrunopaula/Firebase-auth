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
  apiKey: process.env.REACT_APP_APPID,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSendId: process.env.REACT_APP_MESSAGINGSENDERID,
}

firebase.initializeApp(config1)
firebase.firestore()

export default firebase
