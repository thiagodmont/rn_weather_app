import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { FontSize, Spaces, Colors } from 'app/design'

export interface Styles {
  container: ViewStyle;
  headerText: TextStyle;
  descriptionText: TextStyle;
  sunny: ViewStyle;
  floatButton: ViewStyle;
  spacer: ViewStyle;
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
      descriptionText: {
        color: "#353031",
        textAlign: 'center',
        fontSize: FontSize.Body,
        marginBottom: Spaces.Large,
      },
      sunny: {
        alignItems: 'center',
        marginTop: Spaces.Large
      },
      floatButton: {
        marginTop: Spaces.Large
      },
      spacer: {
        marginVertical: Spaces.Medium
      }
    }),
  );
}

export default ComponentStyle;
