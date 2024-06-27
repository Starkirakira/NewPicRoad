<template>
  <div class="container-grid">
    <div
      vue-masonry="grid"
      ref="masonryContainer"
      transition-duration="0.8s"
      item-selector=".grid-item"
      stagger="50"
      percentPosition: true
      gutter="5"
    >
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div v-masonry-tile class="grid-item" v-for="(item, index) in images" :key="index">
        <img :src="item" :alt="item" />
      </div>
      </div>
      
    </div>
    <div class="next">
      <button @click="loadNextImages">👇</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick} from 'vue'
//import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
//import 'vue-waterfall-plugin-next/dist/style.css'
import imagesLoaded from 'imagesloaded'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
//Loaded image objects
const imageObject = import.meta.glob('@/assets/webp/*.{webp,jpg,jpeg}', { eager: true })
//THe array of first render
const images = ref([])
//The array pf images' url
const randomImage = ref([])
//counter of images
const currentImagesIndex = ref(0)
//ImagesLoaded
const masonryContainer = ref(null)
const loading = ref(true)
const loadNum = ref(5)
//console.log(Object.keys(imageObject).map((key) => new URL(key, import.meta.url).href))
//Change the url of images and translate it to an array
const loadImages = (batch) => {
  return Object.keys(batch).map((key) => new URL(key, import.meta.url).href)
}
//Array of images' names
randomImage.value = loadImages(imageObject)

//Notice of info
const notyf = new Notyf({
  duration: 5000,
  position: {
    x: 'center',
    y: 'top'
  },
  types: [
    {
      type: 'info',
      icon: false
    }
  ]
})

//Load n images per time
const getFiveImages = (arr, startIndex) => {
  const endIndex = Math.min(startIndex + 5, arr.length)
  return arr.slice(startIndex, endIndex)
}

//Load next n images
const loadNextImages = async () => {
  if (currentImagesIndex.value < randomImage.value.length) {
    const nextImage = getFiveImages(randomImage.value, currentImagesIndex.value)
    images.value = [...images.value, ...nextImage]
    currentImagesIndex.value += loadNum.value
    nextTick(() => {
      imagesLoaded(masonryContainer.value, () => {
        const msnry = masonryContainer.value._masonry;
        if (msnry) {
          msnry.layout();
        }
        loading.value = false; // Hide loading after layout
      })
    })
  } else {
    notyf.open({ type: 'info', message: 'No More Nya😿' })
  }
}
const initLoad = () => {
  loading.value = true;
  images.value = getFiveImages(randomImage.value, currentImagesIndex.value)
  currentImagesIndex.value += loadNum.value
  //If images are all loaded, get new layout from masonry
  nextTick(() => {
    imagesLoaded(masonryContainer.value, () => {
    loading.value = false
    nextTick(()=>{
      const msnry = masonryContainer.value._masonry
      if(msnry) {
        msnry.layout()
      }
    })
  })
  })
}

onMounted(()=>{
  initLoad()
})
</script>

<style scoped>
.grid {
  width: 100%;
  height: auto;
  margin: 0 auto;
  background: #eee;
}
.grid-sizer,
.grid-item {
  width: 32%;
  margin: 0.3%;
}
.grid-item {
  float: left;
}
.grid-item img {
  width: 100%;
  display: block;
}
.grid::after {
  content: '';
  display: block;
  clear: both;
}

/* notyf */
.notyf__toast {
  background-color: rgba(42, 255, 237, 0.475) !important;
}
.img-header {
  width: 100%;
}
.begin-img {
  width: 100%;
}
.next {
  text-align: center;
}
.container-grid {
  display: flex;
  flex-direction: column;
}
</style>
