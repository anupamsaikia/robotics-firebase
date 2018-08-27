<template>
<div>
  <v-list two-line>
    <template v-for="(member, index) in members">
      <v-list-tile
        :key="member.id"
        avatar
        @click="() => {}"
      >
        <v-list-tile-avatar>
          <img :src="member.avatar">
        </v-list-tile-avatar>
        
          <v-list-tile-content>
            <router-link :to="'/members/' + member.id" class="my-link">
              <v-list-tile-title class="body-2 grey--text text--darken-3" v-text="member.name"></v-list-tile-title>
              <v-list-tile-sub-title class="body-1" v-text="member.role"></v-list-tile-sub-title>
              </router-link>
          </v-list-tile-content>
        
      </v-list-tile>

      <v-divider
        v-if="index + 1 < members.length"
        :inset="true"
        :key="index"
      ></v-divider>
    </template>
  </v-list>

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

  data(){
    return {
      members: [],

      //to show msg in case of no member present
      message: null,

    }
  },

  mounted(){
    this.getData()
  },

  //core_member, faculty, member
  props:['mtype'],
  
  methods:{

    /* ...mapActions([
      'loading'
    ]), */

    getData(){
      this.$store.commit('setLoading', true)

      if(this.mtype == "core_member"){
        db.collection("members")
        .where("visibility", "==", "public")
        .where("level",">=",5)
        .orderBy("level", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.members.push({...doc.data(), ...{'id' : doc.id} })
          });
          if(this.members.length == 0){
            this.message = "No member available"
          }
          this.$store.commit('setLoading', false)
        })
        .catch((error) => {
          this.$store.commit('setLoading', false)
          console.log("Error getting documents: ", error);
        });
      } else {
        var level = (this.mtype == 'faculty')?3:4;
        db.collection("members")
        .where("visibility", "==", "public")
        .where("level","==",level)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.members.push({...doc.data(), ...{'id' : doc.id} })
          });
          if(this.members.length == 0){
            this.message = "No member available"
          }
          this.$store.commit('setLoading', false)
        })
        .catch((error) => {
          this.$store.commit('setLoading', false)
          console.log("Error getting documents: ", error);
        });
      }

      
    },




  },




}
</script>

