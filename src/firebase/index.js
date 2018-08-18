import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


var config = {
  apiKey: "AIzaSyATFMI2Mr1LFsCLQ-OUIWpakZ7xf2oRS2Q",
  authDomain: "robotics-club-cit.firebaseapp.com",
  databaseURL: "https://robotics-club-cit.firebaseio.com",
  projectId: "robotics-club-cit",
  storageBucket: "robotics-club-cit.appspot.com",
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const eventsCollection = db.collection('events')



export {
  db,
  auth,
  currentUser,
  usersCollection,
  eventsCollection,
}
