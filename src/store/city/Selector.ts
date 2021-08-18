import { createSelector } from 'reselect'
import { AppState } from 'app/store'
import { ICityState } from 'app/store/city/Reducer'
import { ErrorPayload } from 'app/utils/fetch/interface'
import StateMachine from 'app/utils/statemachine'
import { City } from 'app/utils/weather'

export interface CitySelector {
  data: City[],
  viewState: StateMachine,
  error?: ErrorPayload | null,
  hasData: boolean,
}

function storeDigested(store: ICityState): CitySelector {
  return { data: store.data, viewState: store.viewState, error: store.error, hasData: store.data.length > 0 }
}

export const citySelector = createSelector<AppState, any, CitySelector>(
  (state) => state?.city,
  storeDigested,
)
