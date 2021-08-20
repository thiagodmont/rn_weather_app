import { createSelector } from 'reselect'
import { AppState } from 'app/store'
import { IFindCityState } from 'app/store/findCity/Reducer'
import { ErrorPayload } from 'app/utils/fetch/interface'
import StateMachine from 'app/utils/statemachine'
import { City } from 'app/utils/weather'

export interface FindCitySelector {
  data: City | null,
  viewState: StateMachine,
  error?: ErrorPayload | null,
}

function storeDigested(store: IFindCityState): FindCitySelector {
  return { data: store.data, viewState: store.viewState, error: store.error }
}

export const findCitySelector = createSelector<AppState, any, FindCitySelector>(
  (state) => state?.findCity,
  storeDigested,
)
