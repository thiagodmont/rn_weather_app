import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { FontSize, Spaces, Colors } from 'app/design'

export interface Styles {
  container: ViewStyle;
  headerText: TextStyle;
  button: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({ children }) => {
  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: Spaces.Large,
        paddingTop: Spaces.Large,
      },
      headerText: {
        color: "#353031",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: FontSize.Level3,
        marginBottom: Spaces.Large,
      },
      button: {
        marginBottom: Spaces.Large,
      },
    }),
  );
}

export default ComponentStyle;
