import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'nowhere-web.firebaseapp.com',
  databaseURL: 'https://nowhere-web.firebaseio.com',
  projectId: 'nowhere-web',
  storageBucket: 'nowhere-web.appspot.com',
  messagingSenderId: '959660492119',
  appId: '1:959660492119:web:fd45e239c1ab467d66aa12',
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
