<script setup>
import { onMounted, ref } from 'vue'
const imageModules = import.meta.glob('@/assets/images/*.{jpg,jpeg}', { eager: true })
let images = []
const randomImage = ref('')
for (const path in imageModules) {
  images.push(path)
}

//Return a ref value of random images import from 'src/assets/images'
const selectRandomImage = () => {
  if (images.length > 0) {
    let index = Math.floor(Math.random() * images.length)
    randomImage.value = images[index]
  }
}

//Hooks, after component mounting
onMounted(() => {
  selectRandomImage()
})
</script>

<template>
  <div class="img-header">
    <img :src="randomImage" class="img-attr" />
  </div>
</template>

<style>
.img-header {
  width: 100%;
  height: auto;
}
.img-attr {
  width: 100%;
  height: auto;
}
</style>
