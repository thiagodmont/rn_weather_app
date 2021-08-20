import baseReducer from 'app/store/utilities/baseReducer'
import StateMachine from 'app/utils/statemachine'
import { InfoUser } from 'app/utils/storage'
import ActionType from 'app/store/account/ActionType'

export interface IAccountState {
  readonly viewState: StateMachine;
  readonly error?: any;
  readonly data: InfoUser | null;
}

const initialState: IAccountState = {
  viewState: StateMachine.NotStarted,
  error: null,
  data: null,
}

export default baseReducer(initialState, {
  [ActionType.ACCOUNT_INFO_VIEW_STATE](
    state,
    action,
  ) {
    return {
      ...state,
      viewState: action.payload,
    }
  },
  [ActionType.ACCOUNT_INFO_ERROR](
    state,
    action,
  ) {
    return {
      ...state,
      error: action.payload,
    }
  },
  [ActionType.ACCOUNT_INFO_DATA](
    state,
    action,
  ) {
    return {
      ...state,
      data: action.payload,
    }
  },
})
