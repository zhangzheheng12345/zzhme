<template>
  <button
    class="border-2px rounded-15px m-5px h-30px w-50px dark:border-white"
    :title="isDark ? 'Toggle to light mode' : 'Toggle to dark mode'"
    @click="($event) => toggleDark()"
  >
    <span
      class="inline-block text-18px dark:bg-white scale-80 trans"
      :class="
        isDark ? 'i-uil-moon translate-x-11px' : 'i-uil-sun  translate-x--10px'
      "
    ></span>
  </button>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '../logic/isDark'
</script>

<style scoped>
.trans {
  transition: transform 0.3s ease-in-out;
}
</style>
