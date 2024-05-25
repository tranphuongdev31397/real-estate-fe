export {}

declare global {
  type ResponseSuccess<T = any> = {
    metadata: T
    message?: string
    status: number
  }

  type ResponseError = {
    error: string
    errorCode: string
    message: string
    method: string
    path: string
    status: number
    timestamp: string
  }
}
