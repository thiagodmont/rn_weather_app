import baseReducer from 'app/store/utilities/baseReducer'
import { StateMachineType } from 'app/utils/statemachine'
import { City } from 'app/utils/storage'
import ActionType from './ActionType'

export interface FindCityDataState {
  readonly state?: StateMachineType;
  readonly error?: any;
  readonly city?: City | null;
}

export interface IFindCityState {
  readonly data?: FindCityDataState;
}

const initialState: IFindCityState = {
  data: {
    state: StateMachineType.NotStarted,
    error: null,
    city: null,
  }
}

const findCityReducer = baseReducer(initialState, {
  [ActionType.FIND_CITY_DATA_STATE](
    state,
    action,
  ) {
    return {
      ...state,
      data: {
        ...state.data, 
        state: action.payload,
      }
    }
  },
  [ActionType.FIND_CITY_DATA_ERROR](
    state,
    action,
  ) {
    return {
      ...state,
      data: {
        ...state.data, 
        error: action.payload,
      }
    }
  },
  [ActionType.FIND_CITY_DATA](
    state,
    action,
  ) {
    return {
      ...state,
      data: {
        ...state.data, 
        city: action.payload,
      }
    }
  },
})

export default findCityReducer