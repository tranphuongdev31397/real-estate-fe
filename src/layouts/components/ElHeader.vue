<template>
  <header :class="cn('relative', props.class)">
    <nav
      aria-label="nav-contact"
      :class="
        cn(
          'top-0 flex items-center justify-between p-5  text-white mx-auto border-b border-white max-w-screen-2xl',
          theme === 'default' && 'bg-[#2C3A61]'
        )
      "
    >
      <div class="flex items-center gap-x-2">
        <MailOpenIcon />
        <span> phuongtm31397@gmail.com </span>
      </div>

      <div class="flex items-stretch gap-x-4">
        <div class="flex flex-row items-center gap-x-4">
          <FacebookIcon />
          <InstagramIcon />
          <LinkedinIcon />
          <GithubIcon />
        </div>

        <div :class="cn('w-[1.5px] flex flex-1 flex-col bg-white')" />

        <div class="flex flex-row items-center gap-x-2">
          <PhoneIcon />
          <span> +84 78 87 81 801 </span>
        </div>
      </div>
    </nav>
    <nav
      aria-label="nav-main"
      :class="
        cn(
          'sticky top-0 flex items-center justify-between px-4 py-5 mx-auto max-w-screen-2xl',
          theme === 'default' ? 'bg-white' : 'bg-transparent text-white'
        )
      "
    >
      <router-link :to="APP_ROUTES.HOME.path">
        <logo />
      </router-link>

      <ul class="flex flex-row items-center">
        <li v-for="menu in NAVIGATION_MENU" :key="menu.name" class="px-6 py-3">
          <router-link :to="menu.path">
            {{ menu.label }}
          </router-link>
        </li>

        <li>
          <Button
            @click="
              () => {
                if (isLoggedIn) {
                  return
                }
                onOpen()
              }
            "
            variant="transparent"
            size="lg"
          >
            New listing
          </Button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { NAVIGATION_MENU } from '@/constants/common'
import { APP_ROUTES } from '@/constants/route'
import { cn } from '@/lib/utils'
import { useAuthModalStore } from '@/providers/auth-modal/authModalStore'
import { useAuthStore } from '@/stores/auth'
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailOpenIcon,
  PhoneIcon
} from 'lucide-vue-next'
export interface HeaderPrrops {
  class?: string
  theme?: 'default' | 'transparent'
}

const { isLoggedIn } = useAuthStore()

console.log(isLoggedIn)

const props = withDefaults(defineProps<HeaderPrrops>(), {
  theme: 'default'
})

const { onOpen } = useAuthModalStore()
</script>

<style scoped></style>
