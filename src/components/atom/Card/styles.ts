import { Colors } from "app/design";
import { StyleSheet, ViewStyle } from "react-native"

export interface Styles {
  container: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
  style: any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  children,
  style
}) => {
  return children(
    StyleSheet.create({
      container: {
        ...style,
        backgroundColor: Colors.White,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 8
      },
    }),
  );
};

export default ComponentStyle;
