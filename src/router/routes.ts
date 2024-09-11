import {
  FEATURE_ONBOARDING_ROUTE,
  routes as onboardingRoute,
  OnboardingStack,
} from '@cool-onboarding/routes'
import {
  DetailStack,
  FEATURE_WEATHER_DETAIL,
  routes as weatherDetailRoute,
} from '@cool-weather-detail/routes'
import {
  FEATURE_WEATHER_FIND_CITY,
  FindCityStack,
  routes as weatherFindCityRoute,
} from '@cool-weather-find-city/routes'
import {
  FEATURE_WEATHER_HOME_ROUTE,
  HomeStack,
  routes as weatherHomeRoute,
} from '@cool-weather-home/routes'

import type { AppRoutes } from './types'

export type RouteKeys =
  | typeof FEATURE_ONBOARDING_ROUTE
  | typeof FEATURE_WEATHER_HOME_ROUTE
  | typeof FEATURE_WEATHER_FIND_CITY
  | typeof FEATURE_WEATHER_DETAIL

export type RootStackParamList = OnboardingStack &
  HomeStack &
  FindCityStack &
  DetailStack

export const routes: AppRoutes = {
  ...onboardingRoute,
  ...weatherHomeRoute,
  ...weatherDetailRoute,
  ...weatherFindCityRoute,
}
