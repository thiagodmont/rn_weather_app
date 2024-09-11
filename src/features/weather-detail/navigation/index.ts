import { useNavigation, useRoute } from '@react-navigation/native'

import { FEATURE_WEATHER_DETAIL } from '../routes'

import type { DetailStack } from '../routes'
import type { RootStackParamList } from '@cool-core/router/routes'
import type { RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RouteParams = RouteProp<RootStackParamList, '/weather/detail'>

export const useWeatherDetailNavigator = () => {
  const nav = useNavigation<NativeStackNavigationProp<DetailStack>>()

  function go({ city }: RouteProp<DetailStack>['params']) {
    nav.navigate(FEATURE_WEATHER_DETAIL, { city })
  }

  return {
    go,
  }
}

export const useWeatherDetailRoute = () => {
  const route = useRoute<RouteProp<DetailStack>>()

  return {
    city: route.params.city,
  }
}
