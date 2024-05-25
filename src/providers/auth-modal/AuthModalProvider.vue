<template>
  <AuthModal :isOpen="authModalStore.isOpen" @changeOpen="authModalStore.onOpenChange" />
</template>

<script setup lang="ts">
import { useAuthModalStore } from './authModalStore'
const authModalStore = useAuthModalStore()
provide('AuthModalProvider', authModalStore)
</script>
