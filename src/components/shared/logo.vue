<template>
  <img
    alt="Vue logo"
    :class="cn('aspect-square w-[60px] object-contain h-auto', props.class)"
    :src="IMAGES.LOGO"
  />
</template>

<script setup lang="ts">
import { IMAGES } from '@/assets/images'
import { cn } from '@/lib/utils'

export interface LogoProps {
  class?: string
}

const props = withDefaults(defineProps<LogoProps>(), {})
</script>
