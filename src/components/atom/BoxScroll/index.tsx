import React, { useImperativeHandle, useRef } from 'react'

import { ScrollView } from 'react-native-gesture-handler'

import {
  withBorderProps,
  withModifiersProps,
  withSpaceProps,
} from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import type { ViewStyle } from 'react-native'

interface ParamsScrollToEnd {
  animated: boolean
}

export interface BoxScrollRefProps {
  scrollToEnd: (params?: ParamsScrollToEnd) => void
}

export const useBoxScroll = () => {
  const scroll = useRef<BoxScrollRefProps>(null)

  const scrollToEnd = (params?: ParamsScrollToEnd) =>
    scroll.current?.scrollToEnd(params)

  return { ref: scroll, scrollToEnd }
}

type Props = {
  children?: React.ReactNode
  style?: ViewStyle
}

const BoxScroll = React.forwardRef<BoxScrollRefProps, Props>(
  ({ children, style }, ref) => {
    const styles = useStyles(() => ({
      container: {
        ...style,
      },
    }))

    const scrollRef = useRef<ScrollView>(null)

    const scrollToEnd = (params?: ParamsScrollToEnd) => {
      scrollRef?.current?.scrollToEnd(params)
    }

    useImperativeHandle(ref, () => ({
      scrollToEnd,
    }))

    return (
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {children}
      </ScrollView>
    )
  },
)

export default withSpaceProps(withModifiersProps(withBorderProps(BoxScroll)))
