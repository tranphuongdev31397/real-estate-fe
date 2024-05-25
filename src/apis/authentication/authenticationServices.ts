import router from '@/router'
import { axios } from '@/http/axios'
import {
  destroySensitiveInfo,
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

const ENDPOINT = 'auth'

export const refreshToken = async (): Promise<string | undefined> => {
  const { clearStore } = useAuthStore()

  try {
    if (getRefreshToken() && getDeviceId()) {
      const data: RefreshTokenRequest = {
        refreshToken: getRefreshToken() ?? ''
      }

      const res = await axios.post<ResponseSuccess<RefreshTokenResponse>>(
        ENDPOINT + '/refresh-token',
        data,
        {
          headers: {
            'Device-Id': getDeviceId()
          }
        }
      )
      const { accessToken, refreshToken, expiresAt, deviceId } = res.data?.metadata ?? {}
      saveToken(accessToken, refreshToken, expiresAt, deviceId)
      // TODO: display dialog session expired
      return 'Successfully'
    }

    clearStore()
    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
  } catch (error: any) {
    // TODO: display dialog session expired
    clearStore()
    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
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
