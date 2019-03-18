<template>
  <v-layout row class="my-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-card class="pa-3" flat>
        <v-card-title class="headline">
          Feedback
        </v-card-title>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="fdata.name"
              label="Your Name"
              hint="Enter your name"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              v-model="fdata.feedback"
              label="Feedback"
              hint="Feel free to give any advice or suggestion"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="postData">Submit Feedback</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <p>Your feedback is very valuable to us</p>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  data(){
    return{
      fdata: {}
    }
  },

  methods: {
    postData(){
      db.collection("feedbacks").add(this.fdata)
      .then((data) => {
        alert("Thank You for your valuable feedback... :) ")
        this.$router.push('/')
      })
      .catch((error) => {
        console.error("Error writing document: ", error.message);
      });
    }
  }
}
</script>


