import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import * as CityEffect from './Effect'
import { getCities, removeCity } from 'app/utils/storage'

export const getStoreCities = () => async (dispatch: Dispatch) => {
  CityEffect.setState(dispatch, StateMachineType.Loading)

  const account = await getCities()
  CityEffect.setData(dispatch, account)
  
  CityEffect.setState(dispatch, StateMachineType.Loaded)
}

export const removeCities = (id: number) => async (dispatch: Dispatch) => {
  CityEffect.setState(dispatch, StateMachineType.Loading)

  await removeCity(id)
  
  CityEffect.setState(dispatch, StateMachineType.Loaded)
}