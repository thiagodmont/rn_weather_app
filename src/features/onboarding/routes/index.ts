import { createFeatureRoutes } from '@cool-core/router/utilities'

export const FEATURE_ONBOARDING_ROUTE = '/onboarding'

export type OnboardingStack = {
  [FEATURE_ONBOARDING_ROUTE]: undefined
}

export const routes = createFeatureRoutes([
  {
    component: () => import(/* webpackChunkName: "onboarding" */ '../screen'),
    name: FEATURE_ONBOARDING_ROUTE,
    options: {
      tsKeyTitle: 'onboarding.welcome',
    },
  },
])
