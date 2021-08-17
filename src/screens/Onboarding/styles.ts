import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useFontSize, useSpaces } from "app/design"

export interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({ children }) => {
  const spaces = useSpaces()
  const font = useFontSize()
  
  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        paddingHorizontal: spaces.Large,
        paddingTop: spaces.Large,
        alignItems: "center"
      },
      title: {
        fontSize: font.Level4,
        marginBottom: spaces.Large
      },
      button: {
        width: "100%",
        marginTop: spaces.Large,
      }
    }),
  )
}

export default ComponentStyle
