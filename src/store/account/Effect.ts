import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import { getInfoUser, InfoUser, setInfoUser } from 'app/utils/storage'
import * as ActionUtility from 'app/store/utilities/actionUtility'
import ActionType from 'app/store/account/ActionType'

export const fetchInfoUser = async () => {

  try {
    const data = await getInfoUser()
    
    return {
      data,
      hasError: false
    }
  } catch (e) {
    return {
      data: null,
      hasError: true
    }
  }
}

export const updateInfoUser = async (data: InfoUser) => {
  return await setInfoUser(data)
}

export const setState = (dispatch: Dispatch, payload: StateMachineType) =>
  dispatch(ActionUtility.createAction(ActionType.ACCOUNT_INFO_VIEW_STATE, payload))

export const setData = (dispatch: Dispatch, payload: any) =>
  dispatch(ActionUtility.createAction(ActionType.ACCOUNT_INFO_DATA, payload))

export const setError = (dispatch: Dispatch, payload: any) =>
  dispatch(ActionUtility.createAction(ActionType.ACCOUNT_INFO_ERROR, payload))
