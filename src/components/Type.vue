<template>
  <p>
    👋 <span class="italic">{{ typer.typer.value }}</span>
  </p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { words } from '../logics/typeWords'
import { useTyper } from '../logics/typer'

const typer = useTyper(words)

onMounted(() => typer.typeWords())
</script>
