<template>
<div>

<v-layout class="pa-2 white">
  <div width="50"><img src="../assets/club-logo.png" alt="Logo" height="80"></div>
  <v-spacer>
    <div v-if="$vuetify.breakpoint.smAndUp" class="py-4 white" style="text-align:center">
      <span class="headline" style="color:#ffa100;">Welcome to </span>
      <span class=" display-1 blue--text">Robotics Club, </span>
      <span class="headline grey--text text--darken-2">CIT Kokrajhar</span>
    </div>
  </v-spacer>
  <div width="50"><img src="../assets/cit-logo.png" alt="Logo" height="80"></div>
</v-layout>
<div v-if="$vuetify.breakpoint.xsOnly" class="py-4 white" style="text-align:center">
  <span class="headline" style="color:#ffa100;">Welcome to </span>
  <span class=" display-1 blue--text">Robotics Club, </span>
  <span class="headline grey--text text--darken-2">CIT Kokrajhar</span>
</div>



<v-btn
  class="mx-0"
  color="primary"
  large
  to="/join"
>
  Join Club
</v-btn>

<div>
  <v-layout row class="my-3 white">
    <v-flex xs6 sm6 class="pa-3">
      <a href="https://www.youtube.com/channel/UCo7ZitSCcgWNEsQVVzBx41g" style="display:flex; justify-content:center;">
        <v-avatar>
          <img src="../assets/youtube.png" alt="Youtube">
        </v-avatar>
        <span class="pa-3 subheading">Youtube</span>
      </a>
    </v-flex>

    <v-flex xs6 sm6 class="pa-3">
      <a href=" https://facebook.com/themoderngeeks" style="display:flex; justify-content:center;">
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
