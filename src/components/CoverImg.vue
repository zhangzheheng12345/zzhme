<template>
  <div
    class="absolute top--10px left-0 z--99 w-100% overflow-hidden h-40vh transition-750 shadow-md"
    :class="loading ? 'op-0 translate-y-10px' : 'op-95'"
  >
    <img :src="photo.img" class="relative" />
  </div>
  <div class="w-100%" :class="loading ? 'h-5vh' : 'h-25vh'"></div>
</template>

<script setup lang="ts">
import { createApi } from 'unsplash-js'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const photo = ref<{
  url: string
  img: string
}>({
  url: '',
  img: ''
})

const client = createApi({
  accessKey: 'SO29nAMDIVYkmZEDBQ5GWhnG3cgQFOooweJbQDXs7dU'
})

const fetchPhoto = () => {
  fetch(photo.value.url)
    .then((response) => response.blob())
    .then((data) => {
      photo.value.img = URL.createObjectURL(data)
      loading.value = false
    })
}

const requestUnplash = () =>
  client.collections.getPhotos({ collectionId: 'YC3VHrVE-D0' }).then((res) => {
    if (!res.errors) {
      const photo_ =
        res.response.results[
          Math.floor(Math.random() * res.response.results.length)
        ]
      photo.value.url =
        photo_.urls.raw +
        `&${window.innerWidth > window.innerHeight * 0.4 ? 'w=' + window.innerWidth : 'h=' + window.innerHeight * 0.4}&auto=format`
      fetchPhoto()
    }
  })

onMounted(() => requestUnplash())
</script>

<style scoped>
@media (width > (height *0.4)) {
  img {
    width: 100%;
    top: -20px;
  }
}
@media (width <= (height*0.4)) {
  img {
    height: 100%;
    left: -30px;
  }
}
</style>
