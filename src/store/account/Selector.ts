import { createSelector } from 'reselect'
import { AppState } from 'app/store'
import { IAccountState } from 'app/store/account/Reducer'
import { ErrorPayload } from 'app/utils/fetch/interface'
import StateMachine from 'app/utils/statemachine'
import { InfoUser } from 'app/utils/storage'

export interface AccountSelector {
  data?: InfoUser | null,
  viewState?: StateMachine,
  error?: ErrorPayload | null,
}

function storeDigested(store: IAccountState): AccountSelector {
  return { data: store.data, viewState: store.viewState, error: store.error }
}

export const accountSelector = createSelector<AppState, any, AccountSelector>(
  (state) => state?.account,
  storeDigested,
)
