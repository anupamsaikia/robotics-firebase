<template>
<div>
  <div v-if="events">
    <v-list three-line subheader>
      <template v-for="(event, index) in events">
        <v-list-tile
          :key="event.id"
          avatar
          @click="()=>{}"
        >
          <v-list-tile-avatar color="blue" size="48">
            <span class="white--text caption">{{ event.time | shortDate }}</span>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <router-link :to="'/events/'+event.id" class="my-link">
              <v-list-tile-title class="body-2 grey--text text--darken-3">{{ event.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="body-1">{{ event.place }}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="body-1">{{ event.time | niceDateTime}}</v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ event.time | interval }}</v-list-tile-action-text>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider
          v-if="index + 1 < events.length && !event.header"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </div>

<!-- Delete dialog 
  <v-dialog v-model="deleteDialog" max-width="600" transition="slide-y-transition">
    <delete-event :id="deleteEventId" @close="deleteDialog=false"></delete-event>
  </v-dialog>

 Pagination 
  <div v-if="events" class="text-xs-center my-5">
    <v-pagination 
    :length="length"
    v-model="page"
    circle
    total-visible="7"
    ></v-pagination>
  </div>
-->
  <div v-if="message" class="my-5">
    <p class="title py-5 px-2 grey--text text--darken-2" style="text-align:center">{{ message }}</p>
  </div>

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
  props: ['tense'],
  data(){
    return {
      //to store all the events
      events: [],
      //to show msg in case of no event present
      message: null,
    }
  },

  methods: {

    getData(){
      this.events = []

      var sign, order
      if(this.tense == "future"){
        sign = '>='
        order = 'asc'
      }
      else {
        sign = '<'
        order = 'desc'
      }

      this.$store.commit('setLoading', true)

      db.collection("events")
        .where("visibility", "==", "public")
        .where("eventTime",sign,new Date())
        .orderBy("eventTime", order)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let time = doc.data().eventTime.toDate()
            this.events.push({...doc.data(), ...{'id' : doc.id, 'time' : time} })
          });
          this.$store.commit('setLoading', false)
          if(this.events.length == 0){
            this.message = "No event available"
          }          
        })
        .catch((error) => {
          this.$store.commit('setLoading', false)
          console.log("Error getting documents: ", error);
        });

    },

  },

  filters: {
    niceDateTime: function (value) {
      if (!value) return ''
      return format(value,"ddd, D MMM YYYY, h:mm A ")
    },
    shortDate: function (value) {
      if (!value) return ''
      return format(value,"D MMM")
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


  mounted(){
    this.getData()
  }
}

</script>

