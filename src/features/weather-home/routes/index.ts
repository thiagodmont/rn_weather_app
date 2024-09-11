import { createFeatureRoutes } from '@cool-core/router/utilities'

export const FEATURE_WEATHER_HOME_ROUTE = '/weather/home'

export type HomeStack = {
  [FEATURE_WEATHER_HOME_ROUTE]: undefined
}

export const routes = createFeatureRoutes([
  {
    component: () => import(/* webpackChunkName: "weather-home" */ '../screen'),
    name: FEATURE_WEATHER_HOME_ROUTE,
    options: {
      tsKeyTitle: 'weather.home.cities',
    },
  },
])
