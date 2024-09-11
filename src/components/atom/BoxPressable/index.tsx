import React, { useRef } from 'react'
import { Animated, Pressable } from 'react-native'

import {
  withBorderProps,
  withModifiersProps,
  withPositionProps,
  withSpaceProps,
} from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import type { PropsWithChildren } from 'react'
import type { GestureResponderEvent, ViewStyle } from 'react-native'

type Props = {
  style?: ViewStyle
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined
  disabled?: boolean
  stretch?: boolean
}

const BoxPressable = ({
  children,
  disabled,
  onPress,
  stretch,
  style,
}: PropsWithChildren<Props>) => {
  const fadeAnim = useRef(new Animated.Value(1)).current

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      duration: 120,
      toValue: 0.5,
      useNativeDriver: true,
    }).start()
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      duration: 120,
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const onPressInInternal = (_: GestureResponderEvent) => {
    if (!onPress) return
    fadeOut()
  }

  const onPressOutInternal = (_: GestureResponderEvent) => {
    if (!onPress) return
    fadeIn()
  }

  const styles = useStyles(
    () => ({
      container: {
        ...style,
        opacity: fadeAnim,
      },
      pressable: {
        alignSelf: stretch ? 'stretch' : undefined,
      },
    }),
    [fadeAnim, stretch],
  )

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressInInternal}
      onPressOut={onPressOutInternal}
      style={styles.pressable}
    >
      <Animated.View style={styles.container}>{children}</Animated.View>
    </Pressable>
  )
}

export default withPositionProps(
  withSpaceProps(withModifiersProps(withBorderProps(BoxPressable))),
)
