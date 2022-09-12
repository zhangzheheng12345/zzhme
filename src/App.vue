<template>
  <top-bar></top-bar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import topBar from './components/topBar.vue'
</script>

<style>
/* Global Styles */
* {
  margin: 0px;
  padding: 0px;
}
</style>
