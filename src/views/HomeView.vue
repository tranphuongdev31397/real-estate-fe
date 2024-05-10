<script setup lang="ts">
import { fetchPosts } from '@/apis/testApi/testService'
import { IMAGES } from '@/assets/images'
import ElHeader from '@/layouts/components/ElHeader.vue'

const data = async () => {
  const data = await fetchPosts()

  console.log(data)
}

data()
</script>

<template>
  <main class="h-[10000px] relative">
    <section
      :style="{
        // @ts-ignore
        '--image-url': `url(${IMAGES.BG_MAS})`
      }"
      :class="'h-[800px] bg-cover bg-center bg-blend-overlay bg-primary/80  bg-[image:var(--image-url)] '"
    >
      <ElHeader :theme="'transparent'" />
    </section>
  </main>
</template>
