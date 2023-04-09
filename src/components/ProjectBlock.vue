<template>
  <div class="base-block rounded-5px p-10px m-10px mt-25px mb-25px">
    <h2>{{ props.name }}</h2>
    <ul>
      <li>
        <a target="_blank" :href="repoLink">GitHub Repo</a>
      </li>
      <li v-if="props.websiteLink !== undefined">
        Website at
        <a>{{ props?.websiteLink }}</a>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  repoLink: string
  websiteLink: string | undefined
}>()
</script>

<style>
.dark .base-block {
  background-color: rgba(256, 256, 256, 0.08);
  backdrop-filter: saturate(180%) blur(20px);
}
.base-block {
  background-color: rgba(26, 136, 240, 0.1);
}

.base-block * {
  background-color: rgba(0, 0, 0, 0);
}
</style>
