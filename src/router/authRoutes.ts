import { APP_ROUTES, DEFAULT_ROUTES } from '@/constants/route'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthModalStore } from '@/providers/auth-modal/authModalStore'
import { useAuthStore } from '@/stores/auth'
import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: APP_ROUTES.LOGIN.path,
        name: APP_ROUTES.LOGIN.name,
        meta: {
          headerTitle: 'About | SeeR',
          searchConfig: {},
          storeConfig: {}
        },
        component: () => import('@/views/LoginView.vue')
      }
    ],

    beforeEnter: (to, from, next) => {
      // All routes just enter if not login yet => should be kick up user to the default page if user is log in

      const { isLoggedIn } = useAuthStore()
      const pathRedirect = from.fullPath || DEFAULT_ROUTES

      const { onOpen } = useAuthModalStore()
      if (isLoggedIn) {
        next({
          path: pathRedirect,
          replace: true
        })
      } else {
        onOpen() // use Auth modal
        // next() // Go to login page
      }
    }
  }
]
