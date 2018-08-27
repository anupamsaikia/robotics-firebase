<template>
<div>
  <div v-if="projects">
    <v-list two-line subheader>
      <template v-for="(project, index) in projects">
        <v-list-tile
          :key="project.id"
          avatar
          @click="()=>{}"
        >
          <v-list-tile-avatar size="48">
            <img :src="'https://robohash.org/' + project.id + '?set=set3&size=48x48'" alt="">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <router-link :to="'/projects/'+ project.id" class="my-link">
              <v-list-tile-title class="body-2 grey--text text--darken-3">{{ project.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="body-1">{{ project.description }}</v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < projects.length && !project.header"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </div>

  <div v-if="message" class="my-5">
    <p class="title py-5 px-2 grey--text text--darken-2" style="text-align:center">{{ message }}</p>
  </div>

</div>
</template>

<script>

import firebase from 'firebase/app'
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  props: ['status'],
  data(){
    return {
      //to store all the projects
      projects: [],
      //to show msg in case of no project present
      message: null,
    }
  },

  methods: {

    getData(){
      this.$store.commit('setLoading', true)
      this.projects = []

      db.collection("projects")
        .where("visibility", "==", "public")
        .where("status", "==", this.status)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.projects.push({...doc.data(), ...{'id' : doc.id} })
          });
          if(this.projects.length == 0){
            this.message = "No project available"
          }
          this.$store.commit('setLoading', false)     
        })
        .catch((error) => {
          this.$store.commit('setLoading', false)
          console.log("Error getting documents: ", error);
        });

    },

  },


  mounted(){
    this.getData()
  }
}

</script>

