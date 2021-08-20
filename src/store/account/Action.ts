import { Dispatch } from 'redux'
import StateMachine from 'app/utils/statemachine'
import * as Effect from 'app/store/account/Effect'

export const accountInfo = () => async (dispatch: Dispatch) => {
  Effect.setState(dispatch, StateMachine.Loading)

  const account = await Effect.fetchInfoUser()
  Effect.setData(dispatch, account.data)
  
  Effect.setState(dispatch, StateMachine.Loaded)
}

export const saveAccountOnboarding = () => async () => {
  return await Effect.updateInfoUser({ onboarding: false })
}
