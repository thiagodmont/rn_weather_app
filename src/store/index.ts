import ReduxThunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import account, { IAccountState } from 'app/store/account/Reducer'
import city, { ICityState } from 'app/store/city/Reducer'
import findCity, { IFindCityState } from 'app/store/findCity/Reducer'

export interface AppState {
  account: IAccountState;
  city: ICityState;
  findCity: IFindCityState;
}

const reducers = combineReducers({
  account,
  city,
  findCity
})

export default createStore(reducers, {}, applyMiddleware(ReduxThunk))