import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Animated, Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { useKeyboard } from 'app/hooks/useKeyboard'

export default function KeyboardShift (props: PropsWithChildren<{}>) {
  const { children } = props
  const [shift, setShift] = useState(new Animated.Value(0))
  const keyboard = useKeyboard()

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)
    return () => {
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  }, [])

  const handleKeyboardDidShow = () => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = keyboard.keyboardHeight;
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();

    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    })
  }

  const handleKeyboardDidHide = () => {
    Animated.timing(
      shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }

  // Android: we need an animated view since the keyboard style can vary widely
  // And React Native's KeyboardAvoidingView isn't always reliable
  if (Platform.OS === 'android') {
    return (
      <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
        {children}
      </Animated.View>
    );
  }

  // iOS: React Native's KeyboardAvoidingView with header offset and 
  // behavior 'padding' works fine on all ios devices (and keyboard types)
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={styles.container}
      behavior={'padding'}>
      {children}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});