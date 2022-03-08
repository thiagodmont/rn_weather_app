import React from 'react'
import { LayoutChangeEvent, View, ViewStyle } from 'react-native'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps from 'app/design/withSpaceProps'
import ComponentStyle from 'app/components/atom/Box/styles'
import withBorderProps from 'app/design/withBorderProps'
import withPositionProps from 'app/design/withPositionProps'

type Props = {
  children?: any;
  tag?: string;
  style?: ViewStyle;
  onLayout?: (data: LayoutChangeEvent) => void;
}

const Box = ({ children, style, onLayout }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <View style={styles.container} onLayout={onLayout}>{children}</View>
    )}
  </ComponentStyle>
)

export default withPositionProps(withBorderProps(withSpaceProps(withModifiersProps(Box))))
