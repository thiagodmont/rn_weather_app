import React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'

import { withModifiersProps, withSpaceProps } from '@cool-core/design'
import { fontPixel } from '@cool-core/design/normalize'
import { useStyles } from '@cool-core/design/useStyles'

import type {
  ThemeColors,
  ThemeFontSize,
  ThemeFontWeight,
} from '@cool-core/design/theme'
import type { ViewStyle } from 'react-native'

type Props = {
  children: React.ReactNode
  fontSize?: ThemeFontSize
  fontWeight?: ThemeFontWeight
  italic?: boolean
  color?: ThemeColors
  underline?: boolean
  textCenter?: boolean
  textRight?: boolean
  style?: ViewStyle
}

const RawText = ({
  children,
  color,
  fontSize = 'base',
  fontWeight,
  italic = false,
  style,
  textCenter = false,
  textRight = false,
  underline = false,
}: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      ...style,
      color,
      fontFamily: 'Avenir-Book',
      fontSize: fontPixel(theme.fontSize[fontSize]),
      fontStyle: italic ? 'italic' : 'normal',
      fontWeight,
      textAlign: textCenter ? 'center' : textRight ? 'right' : 'left',
      textDecorationLine: underline ? 'underline' : 'none',
    },
  }))

  return (
    <RNText style={StyleSheet.flatten([style, styles.text])}>{children}</RNText>
  )
}

const Text = withSpaceProps(withModifiersProps(RawText))

type SubcomponentTextProps = Omit<
  React.PropsWithChildren<React.ComponentPropsWithoutRef<typeof Text>>,
  'fontSize'
>

type Level1Props = SubcomponentTextProps

const Level1 = ({ children, ...props }: Level1Props) => (
  <Text {...props} fontSize="level1">
    {children}
  </Text>
)

type Level2Props = SubcomponentTextProps

const Level2 = ({ children, ...props }: Level2Props) => (
  <Text {...props} fontSize="level2">
    {children}
  </Text>
)

type Level3Props = SubcomponentTextProps

const Level3 = ({ children, ...props }: Level3Props) => (
  <Text {...props} fontSize="level3">
    {children}
  </Text>
)

type TitleProps = Omit<SubcomponentTextProps, 'fontWeight'>

const Title = ({ children, ...props }: TitleProps) => (
  <Text {...props} fontSize="title" fontWeight="bold">
    {children}
  </Text>
)

type SubtitleProps = SubcomponentTextProps

const Subtitle = ({ children, ...props }: SubtitleProps) => (
  <Text {...props} fontSize="subtitle">
    {children}
  </Text>
)

type BodyProps = SubcomponentTextProps

const Body = ({ children, ...props }: BodyProps) => (
  <Text {...props} fontSize="body">
    {children}
  </Text>
)

type CaptionProps = SubcomponentTextProps

const Caption = ({ children, ...props }: CaptionProps) => (
  <Text {...props} fontSize="caption">
    {children}
  </Text>
)

type TextComponent = typeof Text & {
  Level1: React.FC<TitleProps>
  Level2: React.FC<TitleProps>
  Level3: React.FC<TitleProps>
  Title: React.FC<TitleProps>
  Subtitle: React.FC<SubtitleProps>
  Body: React.FC<BodyProps>
  Caption: React.FC<CaptionProps>
}

const TextWithSubcomponents = Text as TextComponent

TextWithSubcomponents.Level1 = Level1
TextWithSubcomponents.Level2 = Level2
TextWithSubcomponents.Level3 = Level3
TextWithSubcomponents.Title = Title
TextWithSubcomponents.Subtitle = Subtitle
TextWithSubcomponents.Body = Body
TextWithSubcomponents.Caption = Caption

export { TextWithSubcomponents as Text }
