<template>
  <!-- Project -->
  <div v-if="projectData" class="my-3">
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title primary-title class="headline">{{ projectData.title }}</v-card-title>
          <v-card-text  class="subheading">{{ projectData.description }}</v-card-text>
          <v-divider></v-divider>

          <v-list two-line subheader>
            <v-subheader>Project details</v-subheader>
            <v-list-tile v-if="projectData.status">
              <v-list-tile-action>
                <v-icon color="green">check_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Status</v-list-tile-title>
                <v-list-tile-sub-title>{{ projectData.status }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-subheader v-if="projectData.members || projectData.xmembers">Project Members</v-subheader>
            <person-list v-if="projectData.members" :ids="projectData.members"></person-list>
            <v-list-tile v-if="projectData.xmembers">
              <v-list-tile-action>
                <v-icon color="blue">person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ projectData.xmembers }}</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
          
          
          
        </v-card>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import personList from '../components/PersonList'
import firebase from 'firebase/app'
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  components:{
    personList
  },
  data: () => ({
    projectData: [],
  }),

  mounted () {
    this.getData()
  },

  methods:{
    getData(){
      this.$store.commit('setLoading', true)
      db.collection("projects")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if(doc.exists){
          this.projectData = doc.data();
        }
        this.$store.commit('setLoading', false)
      })
      .catch((error) => {
        this.$store.commit('setLoading', false)
        console.log("Error getting documents: ", error);
      })
    },

  },


}
</script>


