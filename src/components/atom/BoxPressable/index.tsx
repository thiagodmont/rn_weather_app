import React, { useRef } from 'react'
import { Animated, GestureResponderEvent, Pressable, View, ViewStyle } from 'react-native'
import ComponentStyle from 'app/components/atom/Box/styles'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps from 'app/design/withSpaceProps'
import withBorderProps from 'app/design/withBorderProps'
import withPositionProps from 'app/design/withPositionProps'

type Props = {
  children?: any;
  style?: ViewStyle;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressIn?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const BoxPressable = ({ children, onPress, onPressIn, onPressOut, style }: Props) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const fadeOut = () => {
    Animated.timing(fadeAnim, { toValue: 0.5, duration: 120, useNativeDriver: true }).start()
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 120, useNativeDriver: true }).start()
  }

  const onPressInInternal = (event: GestureResponderEvent) => {
    onPress && fadeOut()
    onPressIn?.(event) && fadeOut()
  }

  const onPressOutInternal = (event: GestureResponderEvent) => {
    onPress && fadeIn()
    onPressOut?.(event) && fadeIn()
  }

  return (<ComponentStyle style={style}>
    {(styles) => (
      <Pressable 
        onPressIn={onPressInInternal}
        onPressOut={onPressOutInternal}
        onPress={onPress}>
          <Animated.View style={{ opacity: fadeAnim, ...styles.container }}>
            {children}
          </Animated.View>
      </Pressable>
    )}
  </ComponentStyle>)
}

export default withPositionProps(withSpaceProps(withModifiersProps(withBorderProps(BoxPressable))))
