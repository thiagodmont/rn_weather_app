import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import { getCities, removeCity } from 'app/utils/storage'
import * as Effect from 'app/store/city/Effect'

export const getStoreCities = () => async (dispatch: Dispatch) => {
  Effect.setState(dispatch, StateMachineType.Loading)

  const account = await getCities()
  Effect.setData(dispatch, account)
  
  Effect.setState(dispatch, StateMachineType.Loaded)
}

export const removeCities = (id: number) => async (dispatch: Dispatch) => {
  Effect.setState(dispatch, StateMachineType.Loading)

  await removeCity(id)
  
  Effect.setState(dispatch, StateMachineType.Loaded)
}
