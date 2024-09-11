import React from 'react'

import { withModifiersProps, withSpaceProps } from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import BoxPressable from '../BoxPressable'

import type { PropsWithChildren } from 'react'
import type { GestureResponderEvent, ViewStyle } from 'react-native'

type Props = {
  style?: ViewStyle
  onPress?: ((event: GestureResponderEvent) => void) & (() => void)
}

const Card = ({ children, onPress, style }: PropsWithChildren<Props>) => {
  const styles = useStyles((theme) => ({
    container: {
      ...style,
      backgroundColor: theme.colors.white,
      borderRadius: 8,
      borderWidth: 0,
      elevation: 5,
      shadowColor: theme.colors.black,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  }))

  return (
    <BoxPressable onPress={onPress} style={styles.container}>
      {children}
    </BoxPressable>
  )
}

export default withSpaceProps(withModifiersProps(Card))
