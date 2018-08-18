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
      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
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
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Enter your details</v-stepper-step>

    <v-stepper-content step="3">
      <v-card flat class="mb-5">
        <v-form ref="form">
          <v-container>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field
                  v-model="personData.name"
                  label="Name"
                  hint="Enter your full name"
                  :counter="30"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
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
  
}
</script>


