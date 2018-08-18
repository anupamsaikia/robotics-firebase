<template>
<div>
<v-jumbotron v-if="$vuetify.breakpoint.mdAndUp" class="anupam">
  <v-container fill-height>
    <v-layout align-center>
      <v-flex>
        <h3 class="headline" style="color:#ffa100">Welcome to</h3>
        <h3 class="display-1 blue--text">Robotics Club</h3>
        <h3 class="headline grey--text text--darken-2">Central Institute of Technology Kokrajhar</h3>

        <span class="subheading"></span>

        <div class="body-2 mt-5">If you are enthusiastic about robotics, fill the form to join the club</div>
        <v-btn
          class="mx-0"
          color="primary"
          large
          to="/join"
        >
          Join Club
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-jumbotron>

<v-jumbotron v-if="$vuetify.breakpoint.smAndDown" class="anupam2">
  <v-container fill-height>
    <v-layout align-center>
      <v-flex>
        <h3 class=" headline" style="color:#ffa100">Welcome to</h3>
        <h3 class=" display-1 blue--text">Robotics Club</h3>
        <br>
        <span class=" at headline grey--text text--darken-3">Central Institute of Technology Kokrajhar</span>

        <span class="subheading"></span>

        <div class=" at white body-2 mt-5">If you are enthusiastic about robotics, fill the form to join the club</div>
        <v-btn
          class="mx-0"
          color="primary"
          large
          to="/join"
        >
          Join Club
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-jumbotron>


<div>
  <v-layout row class="my-3 white">
    <v-flex xs6 sm6 class="pa-3">
      <a href="https://youtube.com" style="display:flex; justify-content:center;">
        <v-avatar>
          <img src="../assets/youtube.png" alt="Youtube">
        </v-avatar>
        <span class="pa-3 subheading">Youtube</span>
      </a>
    </v-flex>

    <v-flex xs6 sm6 class="pa-3">
      <a href="https://facebook.com" style="display:flex; justify-content:center;">
        <v-avatar>
          <img src="../assets/facebook.png" alt="Facebook">
        </v-avatar>
        <span class="pa-3 subheading">Facebook</span>
      </a>
    </v-flex>

  </v-layout>
</div>


</div>
</template>

<script>
export default {

  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '500px'
        case 'sm': return '400px'
        case 'md': return '500px'
        case 'lg': return '500px'
        case 'xl': return '800px'
      }
    },

  
  },

  
}
</script>

<style scoped>
  .anupam{
    background-color: white;
    background-image: url('../assets/bg.png');
    background-size: contain;
    background-position-x: right;
    background-position-y: top;
  }

  .anupam2{
    background-color: white;
    background-image: url('../assets/bg.png');
    background-size: 250%;
    background-position-y: top;
    background-position-x: left;
  
  }

  .at {
   background-color: white!important;
   opacity: 0.65;
 }

</style>
