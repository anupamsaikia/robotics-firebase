<template>
  <v-app id="inspire">
<!--     <my-loader v-show="loading" style="z-index:100"></my-loader>
 -->    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>

          <v-list-tile v-else :key="item.text" :to="'/'+item.target">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="white"
      app
      fixed
      :dense="$vuetify.breakpoint.mdAndDown"
    >
      <v-toolbar-title style="width: 300px" class="">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        left
        nudge-left="40"
      >
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>{{ ($store.state.currentUser)?"person":"more_vert" }}</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile v-if="!$store.state.currentUser" @click="login">
            <v-list-tile-title>Admin Login</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-else @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>


    <!-- <v-dialog max-width="600" :value="$store.state.adminLoginDialog">
      <admin-login :next="$store.state.loginNext" @close="toggleLoginForm"></admin-login>
    </v-dialog> -->


    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
  //import Loader from '@/components/loader'
  //import AdminLogin from '@/components/adminLogin'
  //import { mapActions } from 'vuex'

  export default {
    /* components: {
      'my-loader': Loader,
      AdminLogin,
    }, */
    methods:{
      login(){

      },
      logout(){
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      },
    },

    data: () => ({
      title: 'Robotics Club',
      drawer: null,
      items: [
        { icon: 'home', text: 'Home', target: '' },
        { icon: 'person_add', text: 'Join Club', target: 'join' },
        { icon: 'event', text: 'Events', target: 'events' },
        { icon: 'android', text: 'Projects', target: 'projects' },
        { icon: 'group', text: 'Members', target: 'members' },
        { icon: 'book', text: 'Tutorials', target: 'tutorials' },
        { icon: 'photo_library', text: 'Gallery', target: 'gallery' },
      ],

      //adminLoginDialog: false,

    }),
    
    name: 'App'
  }
</script>

<style>
a{
  text-decoration: none;
  color: inherit;
  font:inherit;
}

.my-link{
  width:100%; 
}

</style>

