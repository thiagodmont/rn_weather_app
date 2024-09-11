import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import slugify from 'slugify'

import type { User } from './types'
import type { ApiResult } from '@cool-core/types'

const baseUrl = 'https://randomuser.me/api/'

export const useGetFakeUser = () => {
  const generateURL = queryString.stringifyUrl({
    url: `${baseUrl}`,
  })

  return useQuery<ApiResult<User>>({
    queryFn: async () => {
      const response = await fetch(generateURL)

      if (!response.ok) {
        return {
          error: { details: 'The request response was not ok' },
          status: response.status,
        }
      }

      const responseJson = await response.json()

      const [user] = responseJson.results

      return { result: user, status: response.status }
    },
    queryKey: ['get-fake-user', slugify(generateURL)],
    staleTime: 0,
    // throwOnError: (error) => error.response?.status >= 500,
  })
}
