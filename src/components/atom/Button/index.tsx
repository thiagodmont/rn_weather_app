import React from 'react'

import {
  withBorderProps,
  withModifiersProps,
  withSpaceProps,
} from '@cool-core/design'
import { useStyles } from '@cool-core/design/useStyles'
import { getShadowProperties } from '@cool-core/design/withBorderProps'

import { Box, BoxPressable, Loading, Text } from '../'

import type { ThemeColors, ThemeFontWeight } from '@cool-core/design/theme'
import type { ViewStyle } from 'react-native'

type Props = {
  text: string
  textColor?: ThemeColors
  textWeight?: ThemeFontWeight
  color?: ThemeColors
  style?: ViewStyle
  onPress?: () => void
  loading?: boolean
  disabled?: boolean
  rounded?: boolean
  shadow?: boolean
  outline?: boolean
}

const Button = ({
  color = 'primary',
  disabled = false,
  loading = false,
  onPress,
  outline = false,
  rounded = false,
  shadow = false,
  style,
  text,
  textColor,
  textWeight = 'normal',
  ...props
}: Props) => {
  const styles = useStyles((theme) => ({
    container: {
      borderRadius: rounded ? 28 : 8,
      ...style,
      backgroundColor: theme.colors[color],
      borderColor: style?.borderColor ? style?.borderColor : color,
      borderWidth: outline ? 1 : style?.borderWidth ? style?.borderWidth : 0,
      height: 54,
      ...getShadowProperties(shadow),
    },
    disabled: {
      opacity: 0.6,
    },
  }))

  const onHandlePress = () => {
    onPress?.()
  }

  return (
    <BoxPressable
      {...props}
      disabled={loading || disabled}
      onPress={onHandlePress}
      stretch
      style={styles.container}
    >
      <Box centerV flex>
        {loading ? (
          <Loading color="white" />
        ) : (
          <Text.Subtitle
            color={outline && !textColor ? 'black' : textColor ?? 'white'}
            fontWeight={textWeight}
            textCenter
          >
            {text}
          </Text.Subtitle>
        )}
      </Box>
    </BoxPressable>
  )
}

export default withBorderProps(withSpaceProps(withModifiersProps(Button)))
