<template>
<div class="my-3">
  <h3 class="px-3">Photo Gallery</h3>
  <div class="pa-3">
    <vue-picture-swipe :items="items"></vue-picture-swipe>
  </div>
</div>
</template>

<script>
import VuePictureSwipe from 'vue-picture-swipe';

export default {
  components:{
    VuePictureSwipe
  },

  data(){
    return {
      items: [{
          src: 'http://via.placeholder.com/600x400',
          thumbnail: 'http://via.placeholder.com/100x100',
          w: 600,
          h: 400,
          title: 'Will be used for caption'
        },
        {
          src: 'http://via.placeholder.com/1200x900',
          thumbnail: 'http://via.placeholder.com/64x64',
          w: 1200,
          h: 900
        }
      ],

    }
  },
  

}
</script> 

