import { Colors } from 'app/design'
import { Platform, StyleSheet, ViewProps, ViewStyle } from 'react-native'

export interface Styles {
  container: ViewStyle;
  shadow: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
  color: Colors;
  size: number;
  style?: ViewProps;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  children,
  color,
  size,
  style,
}) => {
  return children(
    StyleSheet.create({
      container: {
        ...style,
        height: size,
        backgroundColor: color
      },
      shadow: {
        ...style,
        width: "100%",
        height: 10,
        ...Platform.select({
          ios: {
            shadowColor: Colors.Black,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            shadowOpacity: 0.5,
            elevation: 5,
            borderBottomColor: "#F5F5F5",
            borderBottomWidth: 1,
          },
          android: {
            borderBottomColor: "#F5F5F5",
            borderBottomWidth: 1,
          }
        }),
      }
    }),
  );
};

export default ComponentStyle;
