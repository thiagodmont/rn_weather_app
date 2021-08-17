import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import * as Effect from 'app/store/account/Effect'

export const accountInfo = () => async (dispatch: Dispatch) => {
  Effect.setState(dispatch, StateMachineType.Loading)

  const account = await Effect.fetchInfoUser()
  Effect.setData(dispatch, account.data)
  
  Effect.setState(dispatch, StateMachineType.Loaded)
}

export const saveAccountOnboarding = () => async () => {
  return await Effect.updateInfoUser({ onboarding: false })
}
