import React from "react"
import { Text as RNText, ViewStyle } from "react-native"
import withSpaceProps from 'app/design/withSpaceProps'
import withModifiersProps from "app/design/withModifiersProps"
import { Colors, FontWeight } from "app/design"
import ComponentStyle from 'app/components/atom/Text/styles'

type Props = {
  children: any;
  weight?: FontWeight;
  italic?: boolean;
  color?: Colors;
  underline?: boolean;
  textCenter?: boolean;
  textRight?: boolean;
  fontSize?: number;
  style?: ViewStyle;
}

const Text = ({ children, weight = FontWeight.Normal, italic = false, underline = false, color = Colors.Black, textCenter = false, textRight = false, fontSize, style }: Props) => (
  <ComponentStyle style={style} weight={weight} color={color} center={textCenter} right={textRight} italic={italic} underline={underline} fontSize={fontSize}>
    {(styles) => (
      <RNText style={[style, styles.text]}>{children}</RNText>
    )}
  </ComponentStyle>
)

export const Title = withSpaceProps(withModifiersProps(({ children, style, ...props }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <Text style={styles.title} {...props}>{children}</Text>
    )}
  </ComponentStyle>
)))

export const Subtitle = withSpaceProps(withModifiersProps(({ children, style, ...props }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <Text style={styles.subtitle} {...props}>{children}</Text>
    )}
  </ComponentStyle>
)))

export const Body = withSpaceProps(withModifiersProps(({ children, style, ...props }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <Text style={styles.body} {...props}>{children}</Text>
    )}
  </ComponentStyle>
)))

export const Caption = withSpaceProps(withModifiersProps(({ children, style, ...props }: Props) => (
  <ComponentStyle style={style}>
    {(styles) => (
      <Text style={styles.caption} {...props}>{children}</Text>
    )}
  </ComponentStyle>
)))

export default withSpaceProps(withModifiersProps(Text))
