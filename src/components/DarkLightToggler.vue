<template>
  <button
    class="m-5px text-18px dark:bg-white hover:scale-105"
    :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'"
    :title="isDark ? 'Toggle to light mode' : 'Toggle to dark mode'"
    @click="toggleDark()"
  ></button>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '../logic/isDark'
</script>
