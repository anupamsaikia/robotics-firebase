<template>
<div>

<!-- Error -->
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>

  <v-layout row class="my-3" v-else>
    <v-flex xs12 sm8 offset-sm2>
      <h3 class="headline mt-3 px-3">Registration</h3>
      <v-stepper v-model="e6" vertical class="my-3">

        <v-stepper-step :complete="e6 > 1" step="1">
          Information
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="mb-5" flat>
            Last date of joining is <b>5 September, 2018</b><br>
            You have to pay <b>Rs.150</b> as Membership fee 
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
          <v-btn :loading="btnLoading" id="userPhoneSubmitBtn" color="primary">Continue</v-btn>
          <v-btn flat to="/">Cancel</v-btn>
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
          <v-btn :loading="btnLoading" color="primary" @click="verifyNumber">Continue</v-btn>
          <v-btn flat to="/">Cancel</v-btn>
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
          <v-btn :loading="btnLoading" color="primary" @click="validateAndRegisterUser">Continue</v-btn>
          <v-btn flat to="/">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 5" step="5">
          Photo Upload
        </v-stepper-step>
        <v-stepper-content step="5">
          <v-card class="mb-5" flat>
            <v-layout justify-center class="my-3" row>
              <v-flex xs12 sm6>
                <croppa
                  v-model="myCroppa" 
                  placeholder="click here to select image :)"
                  :accept="'image/*'"
                  :zoom-speed="8"
                  :placeholder-font-size="12"
                  :width="300"
                  :height="300"
                  :quality="1"
                  prevent-white-space
                >  
                </croppa>
              </v-flex>
            </v-layout>
          </v-card>
          <v-btn :loading="btnLoading" color="primary" @click="upload">Submit</v-btn>
        </v-stepper-content>



      </v-stepper>
    </v-flex>
  </v-layout>

</div>
</template>

<script>
import firebase from 'firebase/app'
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  data:()=>({
    error: null,
    myCroppa: {},

    e6: 1,
    btnLoading: false,

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
    //firebase.auth().settings.appVerificationDisabledForTesting = true;
    //this.phoneNumber = "1234567890";
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('userPhoneSubmitBtn', {
      'size': 'invisible',
      'callback': (response)=> {
        //console.log(response)
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.sendSMS();
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    if(this.$store.state.currentUser){
      this.phoneNumber = this.$store.state.currentUser.phoneNumber.substring(3)
    }

   
  },

  methods: {

    validateAndRegisterUser(){
      if (this.$refs.form.validate()) {
        this.btnLoading = true
        this.registerUser()
      }
    },

    registerUser(){
      if(this.$store.state.currentUser){  
        this.personData.phoneNumber = this.$store.state.currentUser.phoneNumber.substring(3)
        db.collection("users").doc(this.$store.state.currentUser.uid).set(this.personData)
        .then(() => {
          this.btnLoading = false
          this.myCroppa.refresh()
          this.e6 = 5
        })
        .catch((error) => {
          this.btnLoading = false
          this.error.title = "Error connecting to database"
          this.error.description = error.message
          //console.error("Error writing document: ", error.message);
        });
      }
      else{
        this.btnLoading = false
        console.log('Please login to register')
      }
    },

    upload() {
      if (!this.myCroppa.hasImage()) {
        alert('no image to upload')
        return
      }
      
      this.btnLoading = true
      this.myCroppa.generateBlob((blob) => {
        const ref = firebase.storage().ref();
        const metadata = {
          contentType: blob.type
        };
        if(this.$store.state.currentUser){
          
          const task = ref.child('avatars/'+ this.$store.state.currentUser.uid + '/avatar.jpg').put(blob, metadata);
          
          task.then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            db.collection("users").doc(this.$store.state.currentUser.uid).update({'avatar': url})
            .then(() => {
              this.btnLoading = false
              this.e6 = 6
              alert("Successfully Registered ... See you soon :) ")
              this.$router.push('/')
            })
            .catch((error) => {
              this.btnLoading = false
              this.error.title = "Error uploading photo"
              this.error.description = error.message
              console.error("Error writing document: ", error.message);
            });
          })
          .catch(console.error);
        }
        
      },'image/jpeg', 0.8)
    },

    getData(){
      if(this.$store.state.currentUser){
        db.collection("users").doc(this.$store.state.currentUser.uid).get()
        .then((doc) => {
          if(doc.exists){
            this.personData = doc.data()
          }
        })
        .catch(function() {

        });
      }
    },


    //send otp
    sendSMS(){
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber('+91' + this.phoneNumber, appVerifier)
        .then((confirmationResult)=> {
          // SMS sent
          this.btnLoading = false
          this.e6 = 3;
          window.confirmationResult = confirmationResult;
        }).catch( (error) => {
          this.btnLoading = false
          this.error.title = "Unable to send OTP"
          this.error.description = error.message
          // Error; SMS not sent
          this.btnLoading = false
          console.log(error.message)
          window.recaptchaVerifier.render().then(function(widgetId) {
            grecaptcha.reset(widgetId);
          })
          
        });
    },
    //verify phone number
    verifyNumber(){
      this.btnLoading = true
      window.confirmationResult.confirm(this.OTP).then(() => {
        // User signed in successfully.
        this.getData()
        this.btnLoading = false
        this.e6 = 4
      }).catch( (error) => {
        this.btnLoading = false
        console.error(error.message)
        alert("OTP is not correct !! Please Enter correct OTP or start the process from beginning")
        // User couldn't sign in (bad verification code?)
      });
    },


  }
  
}
</script>


