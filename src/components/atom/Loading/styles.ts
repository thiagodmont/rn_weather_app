import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { Spaces, FontSize } from "app/design"

export interface Styles {
  container: ViewStyle;
  loadingText: TextStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({ children }) => {
  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spaces.Large,
        paddingTop: Spaces.Large,
      },
      loadingText: {
        color: "#353031",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: FontSize.Level3,
        marginBottom: Spaces.Large,
      },
    }),
  );
}

export default ComponentStyle;
