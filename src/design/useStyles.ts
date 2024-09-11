import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'

import type { Theme } from '@cool-core/design/theme'
import type { Animated, ImageStyle, TextStyle, ViewStyle } from 'react-native'

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

type DependencyList = ReadonlyArray<
  | string
  | number
  | boolean
  | null
  | undefined
  | symbol
  | Animated.Value /* it is a number internally */
>

export const useStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  create: (theme: Theme) => T | NamedStyles<T>,
  deps: DependencyList = [],
): T | NamedStyles<T> => {
  const theme = useTheme() as Theme

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => StyleSheet.create(create(theme)), [...deps, theme])
}
