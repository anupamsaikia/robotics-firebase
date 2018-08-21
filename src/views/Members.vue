<template>
  <!-- Members tabs -->
  <v-layout row class="my-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-tabs
          v-model="tab"
          color="grey lighten-3"
          grow
        >
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab :ripple="false" key="core_members">Core Members</v-tab>
          <v-tab :ripple="false" key="faculty">Faculty</v-tab>
          <v-tab :ripple="false" key="members">Members</v-tab>

        </v-tabs>
        

        <v-tabs-items v-model="tab">
          <v-tab-item key="core_members">
            <member-list mtype="core_member" @error="error = $event"></member-list>
          </v-tab-item>

          <v-tab-item key="faculty">
            <member-list mtype="faculty" @error="error = $event"></member-list>
          </v-tab-item>

          <v-tab-item key="members">
            <member-list mtype="member" @error="error = $event"></member-list>
          </v-tab-item>
        </v-tabs-items>

      </v-card>
    </v-flex>
  </v-layout>

</template>


<script>
import memberList from '@/components/MemberList'
export default {
  components:{
    memberList,
  },

  data:()=>({
    tab: 'true',
    
  })
  
}
</script>



