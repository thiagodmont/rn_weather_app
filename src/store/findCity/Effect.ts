import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import * as ActionUtility from 'app/store/utilities/actionUtility'
import ActionType from './ActionType'
import FetchApi, { ApiResult } from 'app/utils/fetch'

export const findWeatherCity = async (city: string) => {
  const fetch = await FetchApi.weather.get(`/weather?q=${city}`)

  return {
    hasError: FetchApi.hasError(fetch.status),
    data: fetch.data
  }
}

export const findWeatherCityById = async (id: number): ApiResult => {
  const fetch = await FetchApi.weather.get(`/weather?id=${id}`)

  return {
    hasError: FetchApi.hasError(fetch.status),
    data: fetch.data
  }
}

export const setState = (dispatch: Dispatch, payload: StateMachineType) =>
  dispatch(ActionUtility.createAction(ActionType.FIND_CITY_DATA_STATE, payload))

export const setData = (dispatch: Dispatch, payload: any) =>
  dispatch(ActionUtility.createAction(ActionType.FIND_CITY_DATA, payload))

export const setError = (dispatch: Dispatch, payload: any) =>
  dispatch(ActionUtility.createAction(ActionType.FIND_CITY_DATA_ERROR, payload))
