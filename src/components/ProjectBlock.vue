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
  background-color: rgba(102, 145, 236, 0.185);
  box-shadow: 0px 0px 13px rgba(49, 75, 168, 0.45);
}
.base-block {
  background-color: rgba(18, 135, 245, 0.06);
  box-shadow: 0px 0px 12px rgba(88, 114, 199, 0.2);
}

.base-block * {
  background-color: rgba(0, 0, 0, 0);
}
</style>
