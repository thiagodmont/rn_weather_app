import React from 'react'
import { Platform, View } from 'react-native'

import { withModifiersProps, withSpaceProps } from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import type { ThemeColors } from '@cool-core/design/theme'
import type { ViewStyle } from 'react-native'

interface Props {
  color?: ThemeColors
  shadow?: boolean
  style?: ViewStyle
  size?: number
}

const Line: React.FC<Props> = ({
  color = 'greyLight',
  shadow = false,
  size = 1,
  style,
}) => {
  const styles = useStyles((theme) => ({
    container: {
      ...style,
      backgroundColor: color,
      height: size,
    },
    shadow: {
      ...style,
      height: 10,
      width: '100%',
      ...Platform.select({
        android: {
          borderBottomColor: '#F5F5F5',
          borderBottomWidth: 1,
        },
        ios: {
          borderBottomColor: '#F5F5F5',
          borderBottomWidth: 1,
          elevation: 5,
          shadowColor: theme.colors.black,
          shadowOffset: { height: 2, width: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        },
      }),
    },
  }))

  return <View style={shadow ? styles.shadow : styles.container} />
}

export default withSpaceProps(withModifiersProps(Line))
