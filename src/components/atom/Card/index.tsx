import React from 'react'
import { GestureResponderEvent, ViewStyle } from 'react-native'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps from 'app/design/withSpaceProps'
import ComponentStyle from 'app/components/atom/Card/styles'
import BoxPressable from 'app/components/atom/BoxPressable'

type Props = {
  children: any;
  style?: ViewStyle;
  onPress?: (((event: GestureResponderEvent) => void) & (() => void));
}

const Card = ({ children, style, onPress }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <BoxPressable style={styles.container} onPress={onPress}>{children}</BoxPressable>
    )}
  </ComponentStyle>
)

export default withSpaceProps(withModifiersProps(Card))
