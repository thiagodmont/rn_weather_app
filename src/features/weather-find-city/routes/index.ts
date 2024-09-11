import { createFeatureRoutes } from '@cool-core/router/utilities'

export const FEATURE_WEATHER_FIND_CITY = '/weather/findCity'

export type FindCityStack = {
  [FEATURE_WEATHER_FIND_CITY]: undefined
}

export const routes = createFeatureRoutes([
  {
    component: () =>
      import(/* webpackChunkName: "weather-find-city" */ '../screen'),
    name: FEATURE_WEATHER_FIND_CITY,
    options: {
      tsKeyTitle: 'weather.find_city.title',
    },
  },
])
