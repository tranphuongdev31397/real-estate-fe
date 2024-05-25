import router from '@/router'
import { axios } from '@/http/axios'
import {
  destroySensitiveInfo,
  getBearerToken,
  getDeviceId,
  getRefreshToken,
  saveToken
} from '@/services/localStorage'
import type { RefreshTokenRequest, RefreshTokenResponse } from './authenticationTypes'
import { APP_ROUTES } from '@/constants'
import type { SignUpSchema } from '@/schemas'
import { Http } from '@/http'
import type { AuthResponse } from '@/types/auth'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'

const ENDPOINT = 'auth'

export const refreshToken = async (): Promise<string | undefined> => {
  const { clearStore, setTokens } = useAuthStore()

  try {
    if (getRefreshToken()) {
      const res = await axios.get<ResponseSuccess<RefreshTokenResponse>>(
        ENDPOINT + '/refresh-token',
        {
          headers: {
            'Device-Id': getDeviceId(),
            'x-refresh-token': getRefreshToken(),
            Authorization: getBearerToken()
          }
        }
      )
      const tokens = res.data?.metadata?.tokens ?? {}

      saveToken(tokens.accessToken, tokens.refreshToken, '', '')
      setTokens(tokens)
      // TODO: display dialog session expired

      return 'Successfully'
    }

    clearStore()
    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
  } catch (error: any) {
    // TODO: display dialog session expired
    toast.error('Token expired, please login again!')
    clearStore()
    destroySensitiveInfo()
  }
}

export const signUp = async (payload: SignUpSchema): Promise<AuthResponse | null> => {
  const { setLoggedIn } = useAuthStore()
  try {
    const res = await Http.post<ResponseSuccess<AuthResponse>>(ENDPOINT + '/sign-up', payload)
    if (res?.metadata.tokens) {
      saveToken(res?.metadata.tokens.accessToken, res?.metadata.tokens.refreshToken, '', '')

      setLoggedIn(res.metadata)
    }
    return res?.metadata || null
  } catch (error) {
    throw error || ''
  }
}

export const signIn = async (payload: SignUpSchema): Promise<AuthResponse | null> => {
  const { setLoggedIn } = useAuthStore()

  try {
    const res = await Http.post<ResponseSuccess<AuthResponse>>(ENDPOINT + '/sign-in', payload)
    if (res?.metadata.tokens) {
      saveToken(res?.metadata.tokens.accessToken, res?.metadata.tokens.refreshToken, '', '')

      setLoggedIn(res.metadata)
    }
    return res?.metadata || null
  } catch (error) {
    throw error || ''
  }
}

export const signOut = async (): Promise<AuthResponse | null> => {
  const { clearStore } = useAuthStore()

  try {
    const res = await Http.get<ResponseSuccess<{}>>(ENDPOINT + '/sign-out')

    clearStore()
    destroySensitiveInfo()
    return null
  } catch (error) {
    throw error || ''
  }
}
