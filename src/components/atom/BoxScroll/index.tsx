import React, { useImperativeHandle, useRef } from 'react'
import { ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ComponentStyle from 'app/components/atom/Box/styles'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps from 'app/design/withSpaceProps'
import withBorderProps from 'app/design/withBorderProps'

interface ParamsScrollToEnd {
  animated: boolean
}

export interface BoxScrollRefProps {
  scrollToEnd: (params?: ParamsScrollToEnd) => void;
}

export const useBoxScroll = () => {
  const scroll = useRef<BoxScrollRefProps>(null)

  const scrollToEnd = (params?: ParamsScrollToEnd) => scroll.current?.scrollToEnd(params)

  return { ref: scroll, scrollToEnd }
}

type Props = {
  children?: any;
  style?: ViewStyle;
}

const BoxScroll = React.forwardRef<BoxScrollRefProps, Props>(({ children, style }, ref) => {
  const scrollRef = useRef<ScrollView>(null)

  const scrollToEnd = (params?: ParamsScrollToEnd) => {
    scrollRef?.current?.scrollToEnd(params)
  }

  useImperativeHandle(ref, () => ({
    scrollToEnd,
  }))
  
  return (
    <ComponentStyle style={style}>
      {(styles) => (
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} style={styles.container}>{children}</ScrollView>
      )}
    </ComponentStyle>
  )
})

export default withSpaceProps(withModifiersProps(withBorderProps(BoxScroll)))
