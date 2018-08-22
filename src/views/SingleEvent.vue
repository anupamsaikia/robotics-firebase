<template>
  <!-- Event -->
  <div v-if="eventData" class="my-3">
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title primary-title class="headline">{{ eventData.title }}</v-card-title>
          <v-card-text  class="subheading">{{ eventData.description }}</v-card-text>
          <v-divider></v-divider>

          <v-list>
            <v-list-tile v-if="eventData.place">
              <v-list-tile-action>
                <v-icon color="indigo">place</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Place</v-list-tile-title>
                <v-list-tile-sub-title>{{ eventData.place }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="eventData.time">
              <v-list-tile-action>
                <v-icon color="indigo">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Date</v-list-tile-title>
                <v-list-tile-sub-title>{{ eventData.time | niceDate }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="eventData.time">
              <v-list-tile-action>
                <v-icon color="indigo">schedule</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Time</v-list-tile-title>
                <v-list-tile-sub-title>{{ eventData.time | niceTime }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          
        </v-card>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import format from 'date-fns/format'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import firebase from 'firebase/app'
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  data: () => ({
    eventData: null,
  }),

  mounted () {
    this.getData()
  },

  methods:{
    getData(){
      db.collection("events")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if(doc.exists){
          this.eventData = doc.data();
          this.eventData.time = doc.data().eventTime.toDate()
        }
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      })
    },

  },

  filters: {
    niceDate: function (value) {
      if (!value) return ''
      return format(value,"dddd, D MMM YYYY")
    },
    niceTime: function (value) {
      if (!value) return ''
      return format(value,"h:mm A")
    },
    interval: function (value) {
      if (!value) return ''
      return distanceInWordsStrict(
        new Date(),
        value,
        {addSuffix: true}
      )
    }
  },

}
</script>


