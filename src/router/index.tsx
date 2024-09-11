import React from 'react'
import { useColorScheme } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Loading } from '@cool-core/components-atom'
import { DarkTheme, LightTheme } from '@cool-core/design/theme'
import { usePopulateAccountInfo } from '@cool-core/services-local/account'
import { FEATURE_ONBOARDING_ROUTE } from '@cool-onboarding/routes'
import { FEATURE_WEATHER_HOME_ROUTE } from '@cool-weather-home/routes'

import { routes as appRoutes } from './routes'
import { generateAppFeatureRoutes } from './utilities'

import type { RootStackParamList } from './routes'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export function Routing() {
  const scheme = useColorScheme()
  const { data } = usePopulateAccountInfo()

  if (!data) {
    return <Loading />
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <RootStack.Navigator
        initialRouteName={
          data?.didTheOnboarding
            ? FEATURE_WEATHER_HOME_ROUTE
            : FEATURE_ONBOARDING_ROUTE
        }
      >
        {generateAppFeatureRoutes(appRoutes)}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
