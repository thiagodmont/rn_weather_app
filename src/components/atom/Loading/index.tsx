import React from 'react'
import { ActivityIndicator } from 'react-native'

import { themeColors } from '@cool-core/design/theme'

import type { ThemeColors } from '@cool-core/design/theme'

interface Props {
  size?: 'small' | 'large'
  color?: ThemeColors
}

export const Loading: React.FC<Props> = ({
  color = 'secondary',
  size = 'small',
}) => {
  return <ActivityIndicator color={themeColors[color]} size={size} />
}
