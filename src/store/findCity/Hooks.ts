import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findWeatherCity, findWeatherCityById } from 'app/store/findCity/Action'
import { findCitySelector, FindCitySelector } from 'app/store/findCity/Selector'
import { City } from 'app/utils/weather'

interface FindCityStore extends FindCitySelector {
  findWeatherCity: (city: string) => Promise<{ data: City, hasError: boolean }>;
  findWeatherCityById: (id: number) => Promise<void>;
}

export const useFindCityStore = (): FindCityStore => {
  const dispatch = useDispatch()
  const { data, viewState, error } = useSelector(findCitySelector)

  const _findWeatherCity = useCallback(async(params) => await findWeatherCity(params)(dispatch), [dispatch])
  const _findWeatherCityById = useCallback(async(params) => await findWeatherCityById(params)(dispatch), [dispatch])

  return {
    data,
    viewState,
    error,
    findWeatherCity: _findWeatherCity,
    findWeatherCityById: _findWeatherCityById,
  }
}
