import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
} from 'react-native'

import { Box } from '@cool-core/components-atom'
import { useStyles } from '@cool-core/design/useStyles'

export interface BottomSheetRefProps {
  show: () => void
  dismiss: () => void
}

export const useBottomSheet = () => {
  const modal = useRef<BottomSheetRefProps>(null)

  const show = () => modal.current?.show()
  const dismiss = () => modal.current?.dismiss()

  return { dismiss, ref: modal, show }
}

interface Props {
  children: React.ReactNode
  initialVisible?: boolean
  onClose?: () => void
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, Props>(
  ({ children, initialVisible = false, onClose }, ref) => {
    const styles = useStyles((theme) => ({
      container: {
        flex: 1,
      },
      content: {
        backgroundColor: 'white',
        borderTopLeftRadius: theme.spacing.base,
        borderTopRightRadius: theme.spacing.base,
        paddingTop: theme.spacing.base,
      },
      overlay: {
        backgroundColor: theme.colors.black,
        height: Dimensions.get('window').height,
        position: 'absolute',
        width: Dimensions.get('window').width,
      },
      pin: {
        backgroundColor: theme.colors.grey,
        borderRadius: 6,
        height: 6,
        width: 50,
      },
      pressable: {
        flex: 1,
        justifyContent: 'flex-end',
      },
    }))

    const [visible, setVisible] = useState(initialVisible)

    const screenHeight = Dimensions.get('screen').height
    const panY = useRef(new Animated.Value(screenHeight)).current
    const animation = useRef(new Animated.Value(0))

    const overlay = animation.current.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, 0.2],
      outputRange: [0, 0.2],
    })

    const resetPositionAnim = Animated.timing(panY, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
    })

    const closeAnim = Animated.timing(panY, {
      duration: 350,
      toValue: screenHeight,
      useNativeDriver: true,
    })

    const translateY = panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    })

    const show = () => {
      setVisible(true)
    }
    const dismiss = () => {
      handleDismiss()
    }

    useImperativeHandle(ref, () => ({
      dismiss,
      show,
    }))

    const handleDismiss = () => {
      Animated.timing(animation.current, {
        duration: 180,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        closeAnim.start(onClose)
        setVisible(false)
      })
    }

    useEffect(() => {
      resetPositionAnim.start()
    }, [resetPositionAnim])

    const panResponders = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: Animated.event([null, { dy: panY }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gs) => {
          if (gs.dy > 0 && gs.vy > 2) {
            handleDismiss()
            return
          }
          resetPositionAnim.start()
        },
        onStartShouldSetPanResponder: () => true,
      }),
    ).current

    return (
      <Modal
        animated
        animationType="slide"
        onShow={() => {
          Animated.timing(animation.current, {
            duration: 300,
            toValue: 0.2,
            useNativeDriver: true,
          }).start()
        }}
        transparent
        visible={visible}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Pressable onPress={handleDismiss} style={styles.pressable}>
            <Animated.View style={[styles.overlay, { opacity: overlay }]} />
            <Animated.View
              style={[styles.content, { transform: [{ translateY }] }]}
              {...panResponders.panHandlers}
            >
              <Box centerH mb="base">
                <Box style={styles.pin} />
              </Box>
              {children}
            </Animated.View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    )
  },
)

export default BottomSheet
