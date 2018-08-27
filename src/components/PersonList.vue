<template>
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
              <v-list-tile-sub-title class="body-1" v-text="member.email"></v-list-tile-sub-title>
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
    }
  },

  mounted(){
    this.getData()
  },

  props:['ids'],
  
  methods:{
    getData(){
      this.ids.forEach((id)=>{
        db.collection("members")
        .doc(id)
        .get()
        .then((doc) => {
          this.members.push({...doc.data(), ...{'id' : doc.id} })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      })
    }
  }
}
</script>

