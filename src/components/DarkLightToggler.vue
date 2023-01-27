<template>
  <button
    class="m-5px text-18px text-black dark:!text-white"
    :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'"
    :title="isDark ? 'Toggle to light mode' : 'Toggle to dark mode'"
    @click="toggleDark()"
  ></button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
