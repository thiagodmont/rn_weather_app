import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Text } from '@cool-core/components-atom'
import { t } from '@cool-core/locale'

import type { AppRoutes, FeatureRoute } from './types'

export const generateAppFeatureRoutes = (routes: AppRoutes) => {
  const FeatureStack = createNativeStackNavigator()

  const mountRoutes = () => {
    return Object.keys(routes).map((route: string) => {
      const data = routes[route]

      const ComponentLazy = React.lazy(() => data.component())

      const ComponentSuspense = () => (
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <ComponentLazy />
        </React.Suspense>
      )

      const computeOptions = () => {
        const options = data.options
        if (options?.tsKeyTitle) {
          options.title = t(options.tsKeyTitle)
        }

        return options
      }

      return (
        <FeatureStack.Screen
          component={ComponentSuspense}
          key={data.name}
          name={data.name}
          options={computeOptions()}
        />
      )
    })
  }

  return <FeatureStack.Group>{mountRoutes()}</FeatureStack.Group>
}

export function createFeatureRoutes(
  featureRoutes: Array<FeatureRoute>,
): AppRoutes {
  return featureRoutes.reduce((result, route) => {
    return {
      ...result,
      [route.name]: {
        component: route.component,
        name: route.name,
        options: route.options,
      },
    }
  }, {})
}
