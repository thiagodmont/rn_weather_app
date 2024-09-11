import React from 'react'
import { View } from 'react-native'

import {
  withBorderProps,
  withModifiersProps,
  withPositionProps,
  withSpaceProps,
} from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import type { PropsWithChildren } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'

type Props = {
  style?: ViewStyle
  onLayout?: (data: LayoutChangeEvent) => void
}

const Box = ({ children, onLayout, style }: PropsWithChildren<Props>) => {
  const styles = useStyles(() => ({
    container: {
      ...style,
    },
  }))

  return (
    <View onLayout={onLayout} style={styles.container}>
      {children}
    </View>
  )
}

export default withPositionProps(
  withBorderProps(withSpaceProps(withModifiersProps(Box))),
)
