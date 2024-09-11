import { createFeatureRoutes } from '@cool-core/router/utilities'

import type { City } from '@cool-core/services-query/city/types'

export const FEATURE_WEATHER_DETAIL = '/weather/detail'

export type DetailStack = {
  [FEATURE_WEATHER_DETAIL]: { city: City }
}

export const routes = createFeatureRoutes([
  {
    component: () =>
      import(/* webpackChunkName: "weather-detail" */ '../screen'),
    name: FEATURE_WEATHER_DETAIL,
    options: {
      tsKeyTitle: 'weather.detail.title',
    },
  },
])
