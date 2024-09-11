type ApiError = {
  code?: number
  key?: string
  details?: unknown
}

export type ApiResult<T> = {
  result?: T | null
  status?: number
  error?: ApiError
}
