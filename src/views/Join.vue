<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Enter your phone number
    </v-stepper-step>

    <v-stepper-content step="1">
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

    <v-stepper-step :complete="e6 > 2" step="2">Verify your number</v-stepper-step>

    <v-stepper-content step="2">
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

    <v-stepper-step :complete="e6 > 3" step="3">Enter your details</v-stepper-step>

    <v-stepper-content step="3">
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
                  v-model="personData.remark"
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
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

  </v-stepper>

</template>

<script>
import firebase from 'firebase/app'

export default {
  data:()=>({
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

    uploading: false,
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

    recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

   
  },

  methods: {

    //send otp
    sendSMS(){
      console.log('entered sendSMS')
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber('+91' + this.phoneNumber, appVerifier)
        .then((confirmationResult)=> {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult)
          this.e6 = 2;
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
        this.e6 = 3
      }).catch(function (error) {
        console.log(error.message)
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }
  }
  
}
</script>


