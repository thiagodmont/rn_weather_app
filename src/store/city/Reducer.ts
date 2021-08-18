import baseReducer from 'app/store/utilities/baseReducer'
import { StateMachineType } from 'app/utils/statemachine'
import { City } from 'app/utils/weather'
import ActionType from './ActionType'

export interface ICityState {
  readonly viewState: StateMachineType;
  readonly data: City[];
  readonly error?: any;
}

const initialState: ICityState = {
  viewState: StateMachineType.NotStarted,
  data: [],
  error: null
}

const cityReducer = baseReducer(initialState, {
  [ActionType.CITY_DATA_STATE](
    state,
    action,
  ) {
    return {
      ...state,
      viewState: action.payload,
    }
  },
  [ActionType.CITY_DATA_ERROR](
    state,
    action,
  ) {
    return {
      ...state,
      error: action.payload,
    }
  },
  [ActionType.CITY_DATA](
    state,
    action,
  ) {
    return {
      ...state,
      data: action.payload,
    }
  },
})

export default cityReducer
