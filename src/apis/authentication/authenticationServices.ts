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

const ENDPOINT = 'auth'

export const refreshToken = async (): Promise<string | undefined> => {
  try {
    if (getRefreshToken() && getDeviceId()) {
      const data: RefreshTokenRequest = {
        refreshToken: getRefreshToken() ?? ''
      }

      const res = await axios.post<ResponseSuccess<RefreshTokenResponse>>(
        '/api/v1/oauth2/refresh-token',
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

    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
  } catch (error: any) {
    // TODO: display dialog session expired
    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
  }
}

export const signUp = async (payload: SignUpSchema): Promise<ResponseSuccess | null> => {
  try {
    const res = await Http.post<ResponseSuccess<any>>(ENDPOINT + '/sign-up', payload)
    return res?.metadata
  } catch (error) {
    throw error || ''
  }
}
