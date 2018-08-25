<template>
<div class="my-3">
  <h3 class="px-3">Photo Gallery</h3>
  <div class="pa-3" v-if="items">
    <vue-picture-swipe :items="items"></vue-picture-swipe>
  </div>
  <div v-if="msg">
    <p class="pa-5">{{msg}}</p>
  </div>
</div>
</template>

<script>
import VuePictureSwipe from 'vue-picture-swipe';

import firebase from 'firebase/app'
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default {
  components:{
    VuePictureSwipe
  },

  mounted(){
    this.getData()

  },

  data(){
    return {
      items: [],
      msg : null

    }
  },


  methods:{
    getData(){
      db.collection("gallery-photos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.items.push(doc.data())
          });
          if(this.items.length==0){
            this.msg = 'No photo available right now..'
          }
        })
        .catch((error) => {
            console.log("Error getting photos: ", error);
        });

    }
  }
  

}
</script> 

