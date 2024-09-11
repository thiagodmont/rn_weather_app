import React from 'react'
import { TextInput } from 'react-native'

import { withModifiersProps, withSpaceProps } from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'

import { Box, Text } from '../'

import type { TextInputProps, ViewStyle } from 'react-native'

type Props = Omit<TextInputProps, 'style'> & {
  label: string
  error?: boolean
  style?: ViewStyle
}

const Input = ({ error, label, style, ...props }: Props) => {
  const styles = useStyles((theme) => ({
    container: {
      ...style,
      backgroundColor: theme.colors.background,
      borderColor: error ? theme.colors.danger : theme.colors.neutral,
      borderRadius: 10,
      borderWidth: 1,
      marginVertical: theme.spacing.xsmall,
      paddingHorizontal: theme.spacing.base,
      paddingVertical: theme.spacing.small,
    },
    input: {
      color: theme.colors.black,
      fontSize: theme.fontSize.subtitle,
      marginRight: theme.spacing.small,
      marginTop: theme.spacing.xsmall,
    },
  }))

  return (
    <Box style={styles.container}>
      <Text.Body color="greyDark">{label}</Text.Body>

      <Box mt="xsmall" row>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />
      </Box>
    </Box>
  )
}

export default withSpaceProps(withModifiersProps(Input))
