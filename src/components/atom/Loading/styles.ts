import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useSpaces, useFontSize } from "app/design"

export interface Styles {
  container: ViewStyle;
  loadingText: TextStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({ children }) => {
  const spaces = useSpaces()
  const fontSize = useFontSize()

  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spaces.Large,
        paddingTop: spaces.Large,
      },
      loadingText: {
        color: "#353031",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: fontSize.Level3,
        marginBottom: spaces.Large,
      },
    }),
  );
}

export default ComponentStyle;
