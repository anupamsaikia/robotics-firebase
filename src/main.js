import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'


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


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
