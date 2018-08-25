<template>
<div>
<!-- Error 
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>
-->
<!-- Projects list -->
  
  <v-layout row class="my-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-tabs
          v-model="tab"
          color="grey lighten-3"
          grow
        >
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab :ripple="false" key="completed">
            Completed projects
          </v-tab>

          <v-tab :ripple="false" key="ongoing">
            Ongoing projects
          </v-tab>
        </v-tabs>
        

        <v-tabs-items v-model="tab">
          <v-tab-item key="completed">
            <project-list status="Completed" @error="error = $event"></project-list>
          </v-tab-item>

          <v-tab-item key="ongoing">
            <project-list status="Ongoing" @error="error = $event"></project-list>
          </v-tab-item>
        </v-tabs-items>

      </v-card>
    </v-flex>
  </v-layout>



</div>
</template>

<script>
import ProjectList from '@/components/ProjectList'

export default {
  data(){
    return {
      //error: null,
      tab: "true",
    }
  },
  components: { ProjectList },
}
</script>
