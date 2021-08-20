import { Dispatch } from 'redux'
import { StateMachineType } from 'app/utils/statemachine'
import * as ActionUtility from 'app/store/utilities/actionUtility'
import ActionType from 'app/store/city/ActionType'

export const setState = (dispatch: Dispatch, payload: StateMachineType) =>
  dispatch(ActionUtility.createAction(ActionType.CITY_VIEW_STATE, payload))

export const setData = (dispatch: Dispatch, payload: any) =>
  dispatch(ActionUtility.createAction(ActionType.CITY_DATA, payload))

export const setError = (dispatch: Dispatch, payload: any) =>
  dispatch(ActionUtility.createAction(ActionType.CITY_ERROR, payload))
