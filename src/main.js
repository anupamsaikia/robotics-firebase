import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import myError from './components/Error'
import myLoader from './components/Loader'

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

//check route meta to set title
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title + ' | Robotics Club CITK'
  }
  else{
    document.title = 'Robotics Club CIT Kokrajhar'
  }
  next()
})


//global components 
Vue.component('my-error', myError)
Vue.component('my-loader',  myLoader)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
