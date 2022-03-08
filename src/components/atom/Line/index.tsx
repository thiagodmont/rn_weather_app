import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Colors } from 'app/design'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps from 'app/design/withSpaceProps'
import ComponentStyle from 'app/components/atom/Line/styles'

interface Props {
  color?: Colors;
  shadow?: boolean;
  style?: ViewStyle;
  size?: number;
}

const Line: React.FC<Props> = ({ color = Colors.GreyLight, size = 1, shadow = false, style }) => (
  <ComponentStyle color={color} style={style} size={size}>
    {(styles) => (
      <View style={shadow ? styles.shadow : styles.container} />
    )}
  </ComponentStyle>
)

export default withSpaceProps(withModifiersProps(Line))
