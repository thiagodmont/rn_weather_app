import React from 'react'
import { SafeAreaView } from 'react-native'

import { withModifiersProps, withSpaceProps } from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import type { PropsWithChildren } from 'react'
import type { ViewStyle } from 'react-native'

type Props = {
  style?: ViewStyle
}

const BoxSafe = ({ children, style }: PropsWithChildren<Props>) => {
  const styles = useStyles(() => ({
    container: {
      ...style,
    },
  }))

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

export default withSpaceProps(withModifiersProps(BoxSafe))
