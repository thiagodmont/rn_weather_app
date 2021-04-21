import baseReducer from 'app/store/utilities/baseReducer'
import { StateMachineType } from 'app/utils/statemachine'
import { City } from 'app/utils/weather'
import ActionType from './ActionType'

export interface CityDataState {
  readonly state: StateMachineType;
  readonly error?: any;
  readonly cities: City[];
}

export interface ICityState {
  readonly data: CityDataState;
}

const initialState: ICityState = {
  data: {
    state: StateMachineType.NotStarted,
    error: null,
    cities: [],
  }
}

const cityReducer = baseReducer(initialState, {
  [ActionType.CITY_DATA_STATE](
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
  [ActionType.CITY_DATA_ERROR](
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
  [ActionType.CITY_DATA](
    state,
    action,
  ) {
    return {
      ...state,
      data: {
        ...state.data, 
        cities: action.payload,
      }
    }
  },
})

export default cityReducer