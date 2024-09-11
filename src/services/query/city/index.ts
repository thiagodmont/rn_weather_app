import { useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import queryString from 'query-string'
import slugify from 'slugify'

import * as state from '@cool-core/common/state'
import { Config } from '@cool-core/config'
import { useCityStore } from '@cool-core/store/city'

import type { City } from './types'
import type { StateInterface } from '@cool-core/common/state'
import type { ApiResult } from '@cool-core/types'

const baseUrl = 'https://api.openweathermap.org/data/2.5'

export const useSearchCityById = ({ id }: { id: string }) => {
  const generateURL = queryString.stringifyUrl({
    query: {
      appid: Config.apiKey,
      id,
    },
    url: `${baseUrl}/weather`,
  })

  return useQuery<City>({
    queryFn: async () => {
      const response = await fetch(generateURL)

      if (!response.ok) {
        return {
          error: { details: 'The request response was not ok' },
          status: response.status,
        }
      }

      return response.json()
    },
    queryKey: ['search-city-by-id', slugify(generateURL)],
    staleTime: 5 * 1000,
  })
}

export const useAddCity = () => {
  const queryClient = useQueryClient()
  const [data, setData] = useState<ApiResult<City>>()
  const [currentState, setCurrentState] = useState<StateInterface>(
    state.NotStarted,
  )
  const addCity = useCityStore((cityStore) => cityStore.addCity)

  const runSearchCity = async ({ search }: { search: string }) => {
    setCurrentState(state.Loading)
    const generateURL = queryString.stringifyUrl({
      query: {
        appid: Config.apiKey,
        q: search,
      },
      url: `${baseUrl}/weather`,
    })

    try {
      const { result, status } = await queryClient.fetchQuery<ApiResult<City>>({
        queryFn: async () => {
          const response = await fetch(generateURL)

          if (!response.ok) {
            return {
              error: { details: 'The request response was not ok' },
              status: response.status,
            }
          }

          const responseJson = await response.json()

          if (response.status !== 200) {
            return {
              error: { details: responseJson.message },
              status: response.status,
            }
          }

          addCity(responseJson)

          return { result: responseJson, status: response.status }
        },
        queryKey: ['search-city', slugify(generateURL)],
        staleTime: 5 * 1000,
      })

      setData({ result, status })

      if (status === 200) {
        setCurrentState(state.Success)
      } else {
        setCurrentState(state.Error)
      }
    } catch (err) {
      setData({ error: { details: err } })
      setCurrentState(state.Error)
    }
  }

  return {
    data,
    runSearchCity,
    state: currentState,
  }
}
