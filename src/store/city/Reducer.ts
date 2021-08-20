import baseReducer from 'app/store/utilities/baseReducer'
import StateMachine from 'app/utils/statemachine'
import { City } from 'app/utils/weather'
import ActionType from './ActionType'

export interface ICityState {
  readonly viewState: StateMachine;
  readonly data: City[];
  readonly error?: any;
}

const initialState: ICityState = {
  viewState: StateMachine.NotStarted,
  data: [],
  error: null
}

export default baseReducer(initialState, {
  [ActionType.CITY_VIEW_STATE](
    state,
    action,
  ) {
    return {
      ...state,
      viewState: action.payload,
    }
  },
  [ActionType.CITY_ERROR](
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
