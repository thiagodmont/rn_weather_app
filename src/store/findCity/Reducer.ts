import baseReducer from 'app/store/utilities/baseReducer'
import StateMachine from 'app/utils/statemachine'
import { City } from 'app/utils/weather'
import ActionType from 'app/store/findCity/ActionType'

export interface IFindCityState {
  readonly viewState: StateMachine;
  readonly error?: any;
  readonly data: City | null;
}

const initialState: IFindCityState = {
  viewState: StateMachine.NotStarted,
  error: null,
  data: null,
}

export default baseReducer(initialState, {
  [ActionType.FIND_CITY_VIEW_STATE](
    state,
    action,
  ) {
    return {
      ...state,
      viewState: action.payload,
    }
  },
  [ActionType.FIND_CITY_ERROR](
    state,
    action,
  ) {
    return {
      ...state,
      error: action.payload,
    }
  },
  [ActionType.FIND_CITY_DATA](
    state,
    action,
  ) {
    return {
      ...state,
      data: action.payload,
    }
  },
})
