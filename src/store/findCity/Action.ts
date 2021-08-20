import { Dispatch } from 'redux'
import StateMachine from 'app/utils/statemachine'
import * as Effect from 'app/store/findCity/Effect'
import { addCity } from 'app/utils/storage'

export const findWeatherCity = (city: string) => async (dispatch: Dispatch) => {
  Effect.setState(dispatch, StateMachine.Loading)
  Effect.setError(dispatch, null)

  const result = await Effect.findWeatherCity(city)

  if (result.hasError) {
    Effect.setError(dispatch, result.data.message)
  } else {
    const cityWeatherData = result.data
    const [weather] = cityWeatherData.weather

    cityWeatherData.weather = weather

    await addCity(cityWeatherData)
    Effect.setData(dispatch, result.data)
  }
  
  Effect.setState(dispatch, StateMachine.Loaded)

  return result
}

export const findWeatherCityById = (id: number) => async (dispatch: Dispatch) => {
  const result = await Effect.findWeatherCityById(id)

  if (!result.hasError) {
    const cityWeatherData = result.data
    const [weather] = cityWeatherData.weather

    cityWeatherData.weather = weather

    await addCity(cityWeatherData)
  }
}
