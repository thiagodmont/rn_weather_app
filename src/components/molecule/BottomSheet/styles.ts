import { Dimensions, StyleSheet, ViewStyle } from "react-native"
import { Colors } from "app/design"
import { Space } from "app/design/withSpaceProps"

export interface Styles {
  container: ViewStyle;
  pressable: ViewStyle;
  overlay: ViewStyle;
  content: ViewStyle;
  pin: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  children,
}) => {
  return children(
    StyleSheet.create({
      container: {
        flex: 1
      },
      pressable: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      overlay: {
        backgroundColor: Colors.Black,
        position: "absolute", 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height
      },
      content: {
        backgroundColor: 'white',
        paddingTop: Space.Medium,
        borderTopRightRadius: Space.Medium,
        borderTopLeftRadius: Space.Medium,
      },
      pin: {
        width: 50,
        height: 6,
        borderRadius: 6,
        backgroundColor: Colors.Grey
      }
    }),
  );
};

export default ComponentStyle
