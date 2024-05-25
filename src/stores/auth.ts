import { Authentication } from '@/constants'
import type { AuthResponse, AuthUser } from '@/types/auth'
import type { User } from '@/types/user'
import { defineStore, acceptHMRUpdate } from 'pinia'

interface IUser {
  email: string
  name: string
}

interface IToken {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useLocalStorage<string | null>(Authentication.AccessToken, null)
  const refreshToken = useLocalStorage<string | null>(Authentication.RefreshToken, null)

  const isLoggedIn = ref<boolean>(!!accessToken.value)
  const info = ref<AuthUser | null>(null)
  const tokens = ref<IToken | null>({
    accessToken: accessToken.value || '',
    refreshToken: refreshToken.value || ''
  })

  const setInfo = (user: AuthUser) => {
    info.value = user
  }

  const setIsLoggedIn = (statusLogin: boolean) => {
    isLoggedIn.value = statusLogin
  }
  const setTokens = (token: IToken) => {
    tokens.value = token
    // Set Local Storage
    accessToken.value = token.accessToken
  }

  const setLoggedIn = ({ tokens, user }: AuthResponse) => {
    setIsLoggedIn(true)
    setTokens(tokens)
    setInfo(user)
  }

  const clearStore = () => {
    isLoggedIn.value = false
    info.value = null
    tokens.value = null
    accessToken.value = null
  }

  return {
    isLoggedIn,
    info,
    setInfo,
    setIsLoggedIn,
    setTokens,
    clearStore,
    setLoggedIn
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
