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
  style,
}) => {

  return children(
    StyleSheet.create({
      container: {
        ...style,
      },
    }),
  );
};

export default ComponentStyle;
