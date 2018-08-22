<template>
  <!-- Error message -->
  <div class="my-5">
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ title }}</div>
              <div class="grey--text text--darken-2">
                <div class="mt-3"><v-icon>warning</v-icon><span class="ml-3" v-text="description"></span></div>
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="primary" to="/">Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['title', 'description']
}
</script>

