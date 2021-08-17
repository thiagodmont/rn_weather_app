import { Dispatch } from "redux"
import { StateMachineType } from 'app/utils/statemachine'
import * as AccountEffect from './Effect'
import { getInfoUser, setInfoUser } from 'app/utils/storage'

export const accountInfo = () => async (dispatch: Dispatch) => {
  AccountEffect.setState(dispatch, StateMachineType.Loading)

  const account = await getInfoUser()
  AccountEffect.setData(dispatch, account)
  
  AccountEffect.setState(dispatch, StateMachineType.Loaded)
}

export const saveAccountOnboarding = () => () => {
  setInfoUser({ onboarding: false })
}
