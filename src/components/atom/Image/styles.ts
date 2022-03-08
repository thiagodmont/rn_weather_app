import { Colors } from "app/design";
import { ImageStyle, StyleProp, StyleSheet, ViewStyle } from "react-native"

export interface Styles {
  staticImage: ImageStyle;
  sourceImage: any;
  loading: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
  style: any;
  width: number;
  height?: number;
  loading?: boolean;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  children,
  style,
  width,
  height,
  loading,
}) => {

  return children(
    StyleSheet.create({
      staticImage: {
        ...style,
        ...(width && { width }), 
        ...(height && { height }),
      },
      sourceImage: {
        ...style,
        width, 
        height,
        backgroundColor: loading ? Colors.GreyMedium : undefined,
        zIndex: 0,
      },
      loading: {
        position: "absolute",
        width, 
        height,
        alignItems: "center",
        justifyContent: "center"
      }
    }),
  );
};

export default ComponentStyle;
  