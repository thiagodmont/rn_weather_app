import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useFontSize, useSpaces } from 'app/design'

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
  const { colors } = useTheme()
  const spaces = useSpaces()
  const fontSize = useFontSize()
  
  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spaces.Large,
        paddingTop: spaces.Large,
      },
      headerText: {
        color: "#353031",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: fontSize.Level3,
        marginBottom: spaces.Large,
      },
      descriptionText: {
        color: "#353031",
        textAlign: 'center',
        fontSize: fontSize.SmallBody,
        marginBottom: spaces.Large,
      },
      sunny: {
        alignItems: 'center',
        marginTop: spaces.Large
      },
      floatButton: {
        marginTop: spaces.Large
      },
      spacer: {
        marginVertical: spaces.Medium
      }
    }),
  );
}

export default ComponentStyle;
