import { useNavigation } from '@react-navigation/native'

import { FEATURE_WEATHER_FIND_CITY } from '../routes'

import type { FindCityStack } from '../routes'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const useWeatherFindCityNavigator = () => {
  const nav = useNavigation<NativeStackNavigationProp<FindCityStack>>()

  function go() {
    nav.navigate(FEATURE_WEATHER_FIND_CITY)
  }

  return {
    go,
  }
}
