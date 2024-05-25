import type { User } from './user'

export interface IToken {
  accessToken: string
  refreshToken: string
}

export type AuthUser = Pick<User, 'name' | 'email' | 'id' | 'phone'>

export interface AuthResponse {
  tokens: IToken
  user: AuthUser
}
