<script setup>
import HeadOne from './components/HeadOne.vue'
import PhotoGrid from './components/PhotoGrid.vue'

//import { RouterLink, RouterView } from 'vue-router'
//import HeadOne from './components/HeadOne.vue'
</script>

<template>
  <div class="head-style">
    <HeadOne />
  </div>

  <div>
    <PhotoGrid />
  </div>
</template>

<style scoped>
.head-style {
  margin: 0;
  padding: 0;
  width: 100vw;
}
</style>
