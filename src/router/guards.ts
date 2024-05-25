import { APP_ROUTES } from '@/constants/route'
import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized } from 'vue-router'

export function requiresAuth(to: RouteLocationNormalized) {
  if (to.meta.requiresAuth) {
    // see more https://router.vuejs.org/guide/advanced/meta.html
    // see more https://router.vuejs.org/guide/advanced/navigation-guards.html
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      return {
        name: APP_ROUTES.LOGIN.name,
        query: {
          redirect: to.fullPath
        }
      }
    }
  }
}
