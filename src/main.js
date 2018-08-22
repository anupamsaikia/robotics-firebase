import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import myError from './components/Error'


//croppa
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
Vue.use(Croppa)

//firebase
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
firebase.auth().onAuthStateChanged(()=> {
  store.dispatch('setUser')
});


//global components 
Vue.component('my-error', myError)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
