import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import * as FindCityEffect from './Effect'
import { addCity } from 'app/utils/storage'

export const findWeatherCity = (city: string) => async (dispatch: Dispatch) => {
  FindCityEffect.setState(dispatch, StateMachineType.Loading)
  FindCityEffect.setError(dispatch, null)

  const result = await FindCityEffect.findWeatherCity(city)

  if (result.hasError) {
    FindCityEffect.setError(dispatch, result.data.message)
  } else {
    const cityWeatherData = result.data
    const [weather] = cityWeatherData.weather

    cityWeatherData.weather = weather

    await addCity(cityWeatherData)
    FindCityEffect.setData(dispatch, result.data)
  }
  
  FindCityEffect.setState(dispatch, StateMachineType.Loaded)

  return result
}

export const findWeatherCityById = (id: number) => async (dispatch: Dispatch) => {
  const result = await FindCityEffect.findWeatherCityById(id)

  if (!result.hasError) {
    const cityWeatherData = result.data
    const [weather] = cityWeatherData.weather

    cityWeatherData.weather = weather

    await addCity(cityWeatherData)
  }
}
