<template>
  <div class="relative">
    <Input v-bind="$attrs" :type="isShowPassword ? 'password' : 'text'" />
    <Button
      class="absolute -translate-y-1/2 right-2 top-1/2 size-5"
      type="button"
      v-show="showPassword"
      size="icon"
      variant="link"
      @click="isShowPassword = !isShowPassword"
    >
      <EyeIcon v-if="isShowPassword" />
      <EyeOffIcon v-else />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
withDefaults(
  defineProps<{
    showPassword?: boolean
  }>(),
  {
    showPassword: true
  }
)

const isShowPassword = ref<boolean>(true)
</script>

<style scoped></style>
