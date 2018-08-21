<template>
<div>
<!-- Error -->
<!--   <my-error v-if="error" :title="error.title" :description="error.description"></my-error>
 -->
  <v-layout v-if="personData" row class="my-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <div class="pa-3 text-xs-center">
          <v-avatar size="300" >
            <img :src="personData.avatar" alt="Image">
          </v-avatar>
          <h3 class="headline mt-3">{{ personData.name }}</h3>
          <h3 class="body-2 grey--text text--darken-1">{{ personData.role }}</h3>
          <p class="body-1 grey--text text--darken-1">Robotics Club CIT Kokrajhar</p>
        </div>
        <v-divider></v-divider>
        <v-list two-line>

          <v-list-tile v-if="personData.phone" @click="()=>{}">
            <v-list-tile-action>
              <v-icon color="green">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title id="myPhone">{{ personData.phone }}</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon ripple @click="copyToClipboard(personData.phone)">
                  <v-icon>content_copy</v-icon>
                </v-btn>
                <span>Click to copy</span>
              </v-tooltip>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="personData.phone" inset></v-divider>

          <v-list-tile v-if="personData.email" @click="()=>{}">
            <v-list-tile-action>
              <v-icon color="red darken-1">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title id="myEmail">{{ personData.email }}</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon ripple @click="copyToClipboard(personData.email)">
                  <v-icon>content_copy</v-icon>
                </v-btn>
                <span>Click to copy</span>
              </v-tooltip>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="personData.email" inset></v-divider>

          <v-list-tile v-if="personData.place" @click="()=>{}">
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{personData.place}}</v-list-tile-title>
              <v-list-tile-sub-title>Address</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="personData.place" inset></v-divider>

          <v-list-tile v-if="personData.module && personData.branch" @click="()=>{}">
            <v-list-tile-action>
              <v-icon color="blue">school</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{personData.module}}</v-list-tile-title>
              <v-list-tile-sub-title>{{personData.branch}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="personData.module && personData.branch" inset></v-divider>

          <v-list-tile v-if="personData.rollno" @click="()=>{}">
            <v-list-tile-action>
              <v-icon color="pink">bookmark</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{personData.rollno}}</v-list-tile-title>
              <v-list-tile-sub-title>Roll Number</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="personData.rollno" inset></v-divider>

        </v-list>
      </v-card>
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
  mounted(){
    this.getData()
  },

  data: ()=>({
    personData: null,
    error: null,
  }),

  methods: {
    getData(){
      this.error = null

        db.collection("members")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if(doc.exists){
            this.personData = doc.data();
          }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      
    },

    
    copyToClipboard(str){
      const el = document.createElement('textarea');  // Create a <textarea> element
      el.value = str;                                 // Set its value to the string that you want copied
      el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
      el.style.position = 'absolute';                 
      el.style.left = '-9999px';                      // Move outside the screen to make it invisible
      document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
      const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0)     // Store selection if found
          : false;                                    // Mark as false to know no selection existed before
      el.select();                                    // Select the <textarea> content
      document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el);                  // Remove the <textarea> element
      if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
      }
    },




  }
}
</script>


