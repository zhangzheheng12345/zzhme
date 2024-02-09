<template>
  <p>👋 {{ typer.typer.value }}</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTyper } from '../logics/typer'

const typer = useTyper()

onMounted(() => typer.typeWords())
</script>
