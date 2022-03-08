import React, { useRef, useEffect, useState, useImperativeHandle } from 'react'
import { 
  Modal, 
  PanResponder, 
  Animated, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  Pressable,
} from 'react-native'
import Box from 'app/components/atom/Box'
import { Space } from 'app/design/withSpaceProps'
import ComponentStyle from 'app/components/molecule/BottomSheet/styles'

export interface BottomSheetRefProps {
  show: () => void;
  dismiss: () => void;
}

export const useBottomSheet = () => {
  const modal = useRef<BottomSheetRefProps>(null)

  const show = () => modal.current?.show()
  const dismiss = () => modal.current?.dismiss()

  return { ref: modal, show, dismiss }
}

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, Props>(({ children, onClose }, ref) => {
  const [visible, setVisible] = useState(false)

  const screenHeight = Dimensions.get('screen').height
  const panY = useRef(new Animated.Value(screenHeight)).current
  const animation = useRef(new Animated.Value(0))

  const overlay = animation.current.interpolate({
    inputRange: [0, 0.2],
    outputRange: [0, 0.2],
    extrapolate: "clamp"
  })

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true
  })

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 350,
    useNativeDriver: true
  })

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1]
  })

  const show = () => setVisible(true)
  const dismiss = () => handleDismiss()

  useImperativeHandle(ref, () => ({
    show,
    dismiss
  }));

  const handleDismiss = () => {
    Animated.timing(
      animation.current, 
      { toValue: 0, duration: 180, useNativeDriver: true }
    ).start(() => {
      closeAnim.start(onClose)
      setVisible(false)
    })
  }

  useEffect(() => {
    resetPositionAnim.start()
  }, [resetPositionAnim])

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return handleDismiss()
        }
        return resetPositionAnim.start()
      },
    }),
  ).current

  return (
  <Modal
    animated
    animationType="slide"
    visible={visible}
    onShow={() => {
      Animated.timing(animation.current, { toValue: 0.2, duration: 300, useNativeDriver: true }).start()
    }}
    transparent>
      <ComponentStyle>
        {(styles) => (
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <Pressable style={styles.pressable} onPress={handleDismiss}>
              <Animated.View style={[styles.overlay, { opacity: overlay }]} />
              <Animated.View style={[styles.content, { transform: [{translateY: translateY}] }]} {...panResponders.panHandlers}>
                <Box centerH mb={Space.Medium}>
                  <Box style={styles.pin} />
                </Box>
                {children}
              </Animated.View>
            </Pressable>
          </KeyboardAvoidingView>
        )}
      </ComponentStyle>
  </Modal>)
})

export default BottomSheet