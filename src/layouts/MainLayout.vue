<template>
  <main class="w-full min-h-screen">
    <ElHeader />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import ElHeader from './components/ElHeader.vue'
</script>

<style scoped></style>
