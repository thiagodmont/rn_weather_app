import { StyleSheet, ViewStyle } from 'react-native'
import { Colors } from 'app/design'
import { getShadowProperties } from 'app/design/withBorderProps'

export interface Styles {
  container: ViewStyle;
  disabled: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
  style?: ViewStyle;
  color: Colors;
  rounded?: boolean;
  outline?: boolean;
  shadow?: boolean;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  children,
  style,
  color,
  rounded,
  outline,
  shadow,
}) => {
  return children(
    StyleSheet.create({
      container: {
        borderRadius: rounded ? 28 : 8,
        ...style,
        backgroundColor: outline ? Colors.White : color,
        borderColor: style?.borderColor ? style?.borderColor : color,
        borderWidth: outline ? 1 : style?.borderWidth ? style?.borderWidth : 0,
        alignItems: "center",
        justifyContent: "center",
        height: 54,
        ...getShadowProperties(shadow),
      },
      disabled: {
        opacity: 0.6
      }
    }),
  );
};

export default ComponentStyle;
