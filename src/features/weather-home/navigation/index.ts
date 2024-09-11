import { useNavigation, useRoute } from '@react-navigation/native'

import { FEATURE_WEATHER_HOME_ROUTE } from '../routes'

import type { HomeStack } from '../routes'
import type { RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const useWeatherHomeNavigator = () => {
  const nav = useNavigation<NativeStackNavigationProp<HomeStack>>()

  function go() {
    nav.navigate(FEATURE_WEATHER_HOME_ROUTE)
  }

  /**
   * Navigate to Home and reset the routes stack;
   */
  function goHomeWithClearHistory() {
    nav.reset({
      index: 0,
      routes: [{ name: FEATURE_WEATHER_HOME_ROUTE }],
    })
  }

  return {
    go,
    goHomeWithClearHistory,
  }
}

export const useFeatureRoute = () => {
  const route = useRoute<RouteProp<HomeStack>>()

  return {
    params: route.params,
  }
}
