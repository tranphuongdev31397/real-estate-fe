import { APP_ROUTES } from '@/constants/route'
import { useAuthModalStore } from '@/providers/auth-modal/authModalStore'
import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized } from 'vue-router'

export function requiresAuth(to: RouteLocationNormalized) {
  if (to.meta.requiresAuth) {
    // see more https://router.vuejs.org/guide/advanced/meta.html
    // see more https://router.vuejs.org/guide/advanced/navigation-guards.html
    const authStore = useAuthStore()
    const { onOpen } = useAuthModalStore()

    if (!authStore.isLoggedIn) {
      setTimeout(() => {
        onOpen()
      }, 800)
      return {
        name: APP_ROUTES.HOME.name,
        query: {
          redirect: to.fullPath
        }
      }
    }
  }
}
