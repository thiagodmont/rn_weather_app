import { Colors, FontWeight, useFontSize } from "app/design";
import { fontPixel } from "app/design/normalize";
import { StyleSheet, TextStyle } from "react-native"

export interface Styles {
  text: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  body: TextStyle;
  caption: TextStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
  style: any;
  weight?: FontWeight;
  italic?: boolean;
  underline?: boolean;
  color?: Colors;
  right?: boolean;
  center?: boolean;
  fontSize?: number;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  children,
  style,
  weight,
  italic,
  underline,
  color,
  right,
  center,
  fontSize,
}) => {
  const getFontSize = useFontSize()

  return children(
    StyleSheet.create({
      text: {
        ...style,
        fontWeight: weight,
        color,
        textAlign: center ? "center" : (right ? "right" : "left"),
        fontFamily: "Avenir-Book",
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: fontSize ? fontPixel(fontSize) : fontPixel(style.fontSize),
        textDecorationLine: underline ? 'underline' : 'none'
      },
      title: {
        ...style,
        fontSize: getFontSize.Title,
      },
      subtitle: {
        ...style,
        fontSize: getFontSize.Subtitle,
      },
      body: {
        ...style,
        fontSize: getFontSize.Body,
      },
      caption: {
        ...style,
        fontSize: getFontSize.Caption,
      },
    }),
  );
};

export default ComponentStyle;
  