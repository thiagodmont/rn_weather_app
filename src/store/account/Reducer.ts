import baseReducer from 'app/store/utilities/baseReducer'
import { StateMachineType } from 'app/utils/statemachine'
import { InfoUser } from 'app/utils/storage'
import ActionType from './ActionType'

export interface AccountDataState {
  readonly state?: StateMachineType;
  readonly error?: any;
  readonly value?: InfoUser | null;
}

export interface IAccountState {
  readonly data?: AccountDataState;
}

const initialState: IAccountState = {
  data: {
    state: StateMachineType.NotStarted,
    error: null,
    value: null,
  }
}

const accountReducer = baseReducer(initialState, {
  [ActionType.ACCOUNT_INFO_DATA_STATE](
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
  [ActionType.ACCOUNT_INFO_DATA_ERROR](
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
  [ActionType.ACCOUNT_INFO_DATA](
    state,
    action,
  ) {
    return {
      ...state,
      data: {
        ...state.data, 
        value: action.payload,
      }
    }
  },
})

export default accountReducer