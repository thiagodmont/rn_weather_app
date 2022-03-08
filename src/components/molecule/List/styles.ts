import { Space } from "app/design/withSpaceProps";
import { StyleSheet, ViewStyle } from "react-native"

export interface Styles {
  container: ViewStyle;
  insideContainer: ViewStyle;
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
      },
      insideContainer: {
        paddingHorizontal: Space.Medium,
        paddingVertical: Space.Medium,
      }
    }),
  );
};

export default ComponentStyle;
  