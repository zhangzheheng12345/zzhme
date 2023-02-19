<template>
  <button
    class="m-5px text-18px bg-black dark:bg-white"
    :class="isDark ? 'i-uil-moon' : 'i-uil-sun'"
    :title="isDark ? 'Toggle to light mode' : 'Toggle to dark mode'"
    @click="toggleDark()"
  ></button>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '../logic/isDark'
</script>
