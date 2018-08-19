<template>
<div>
  <v-layout justify-center class="my-3">
    <v-flex xs6 sm6 offset-sm3>
      <croppa
        v-model="croppa" 
        placeholder="click here to select image :)"
        :zoom-speed="7"
        :placeholder-font-size="10"
        :width="150"
        :height="150"
        :quality="1"
        prevent-white-space
      >  
      </croppa>
    </v-flex>
    <v-flex>
      <v-btn @click="upload">Upload</v-btn>
    </v-flex>
  </v-layout>
  



  <h3 class="headline mt-3 px-3">Robotics Club Registration</h3>
  <v-stepper v-if="false" v-model="e6" vertical class="my-3">

    <v-stepper-step :complete="e6 > 1" step="1">
      Information
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="mb-5" flat>
        By joining Robotics club CIT Kokrajhar you agree the rules and regulations of the club
      </v-card>
      <v-btn color="primary" @click="e6 = 2">Start</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      Enter your phone number
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="mb-5" flat>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="phoneNumber"
              mask="##########"
              label="Phone"
              :counter="10"
              :rules="[rules.required]"
            ></v-text-field>
            <p class="caption">An OTP will be sent to verify the number</p>
          </v-flex>
        </v-layout>
      </v-card>
      <v-btn id="userPhoneSubmitBtn" color="primary">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Verify your number</v-stepper-step>

    <v-stepper-content step="3">
      <v-card class="mb-5" flat>
        <v-layout wrap>
          <v-flex xs12>
            <p class="body-2">OTP has been sent</p>
            <v-text-field
              v-model="OTP"
              label="One time password"
            ></v-text-field>
            <p class="caption">If you didn't receive the OTP, Please restart from beginning</p>
          </v-flex>
        </v-layout>
      </v-card>
      <v-btn color="primary" @click="verifyNumber">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 4" step="4">Enter your details</v-stepper-step>

    <v-stepper-content step="4">
      <v-card flat class="mb-5">
        <v-form ref="form">
          <v-container>
            <v-layout wrap>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="personData.name"
                  label="Name"
                  hint="Enter your full name"
                  :counter="30"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="personData.email"
                  label="Email"
                  hint="Enter your valid email address"
                  :counter="100"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="moduleList"
                  label="Module"
                  v-model="personData.module"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="personData.branch"
                  :items="(personData.module == 'Diploma')?dipBranchList:degBranchList"
                  label="Branch"
                  :rules="[rules.required]"
                  dense
                ></v-select>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="personData.rollno"
                  label="Roll no."
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="personData.experience"
                  label="Previous experiences if any"
                  hint="Describe briefly"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="personData.whyjoin"
                  label="Why do you want to join?"
                  hint="Describe briefly"
                ></v-text-field>
              </v-flex>
              

            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <v-btn color="primary" @click="registerUser">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

  </v-stepper>
</div>
</template>

<script>
import firebase from 'firebase/app'
const db = firebase.firestore()

const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  data:()=>({
    myCroppa: {},

    e6: 1,

    phoneNumber : '',
    OTP: '',

    personData: {},

    rules:{
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    },

    moduleList: ['Degree', 'Diploma'],
    degBranchList: ['CSE', 'ECE', 'IE', 'IT', 'FET', 'CE', 'MCD'],
    dipBranchList: ['CO', 'CT', 'ET', 'CI', 'FPT', 'AMT'],

  }),

  mounted(){
    firebase.auth().settings.appVerificationDisabledForTesting = true;

    this.phoneNumber = "1234567890";
    
    console.log('entered mounted')
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('userPhoneSubmitBtn', {
      'size': 'invisible',
      'callback': (response)=> {
        console.log(response)
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.sendSMS();
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

   
  },

  methods: {
    uploadCroppedImage() {
      this.myCroppa.generateBlob((blob) => {
         // write code to upload the cropped image file (a file is a blob)
      }, 'image/jpeg', 0.8) // 80% compressed jpeg file
    },

    upload() {
      if (!this.croppa.hasImage()) {
        alert('no image to upload')
        return
      }

      this.croppa.generateBlob((blob) => {
        console.log(blob)
        const ref = firebase.storage().ref();
        const file = blob
        const name = (+new Date()) + '-' + 'avatar-150x150';
        const metadata = {
          contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            console.log(url);
          })
          .catch(console.error);
        
      },'image/jpeg', 0.8)
    },




    //send otp
    sendSMS(){
      console.log('entered sendSMS')
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber('+91' + this.phoneNumber, appVerifier)
        .then((confirmationResult)=> {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult)
          this.e6 = 3;
          window.confirmationResult = confirmationResult;
        }).catch(function (error) {
          // Error; SMS not sent

          console.log(error.message)
          window.recaptchaVerifier.render().then(function(widgetId) {
            grecaptcha.reset(widgetId);
          })
          
        });
    },

    //verify phone number
    verifyNumber(){
      window.confirmationResult.confirm(this.OTP).then((result) => {
        // User signed in successfully.
        var user = result.user;
        console.log('login success')
        console.log(user)
        this.$store.commit('setCurrentUser', user)
        this.e6 = 4
      }).catch(function (error) {
        console.error(error.message)
        // User couldn't sign in (bad verification code?)
        // ...
      });
    },

    //register new user
    registerUser(){
      if(1){
        db.collection("users").doc(this.$store.state.currentUser.uid).set(this.personData)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error.message);
        });


      }
    },

    test()
    {
      console.log('test')
    }

  }
  
}
</script>


