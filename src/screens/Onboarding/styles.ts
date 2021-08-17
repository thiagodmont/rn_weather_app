import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { FontSize, Spaces } from "app/design"

export interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({ children }) => {
  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        paddingHorizontal: Spaces.Large,
        paddingTop: Spaces.Large,
        alignItems: "center"
      },
      title: {
        fontSize: FontSize.Level4,
        marginBottom: Spaces.Large
      },
      button: {
        width: "100%",
        marginTop: Spaces.Large,
      }
    }),
  )
}

export default ComponentStyle
