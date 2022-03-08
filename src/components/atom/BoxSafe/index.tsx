import React from 'react'
import { SafeAreaView, ViewStyle } from 'react-native'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps from 'app/design/withSpaceProps'
import ComponentStyle from 'app/components/atom/Box/styles'

type Props = {
  children: any;
  style?: ViewStyle;
}

const BoxSafe = ({ children, style }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    )}
  </ComponentStyle>
)

export default withSpaceProps(withModifiersProps(BoxSafe))
