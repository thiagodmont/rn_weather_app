import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useFontSize, useSpaces, useColors } from 'app/design'

export interface Styles {
  box: ViewStyle;
  container: ViewStyle;
  tempeture: TextStyle;
  city: TextStyle;
  button: ViewStyle;
  infoBox: ViewStyle;
  infoBoxData: ViewStyle;
}

interface IComponentStyle {
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({ children }) => {
  
  const spaces   = useSpaces()
  const fontSize = useFontSize()
  const colors   = useColors()
  
  return children(
    StyleSheet.create<Styles>({
      box: {
        flex: 1,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: spaces.Large,
        paddingTop: spaces.Large,
      },
      tempeture: {
        fontSize: fontSize.Level2,
        marginTop: spaces.Medium
      },
      city: {
        fontSize: fontSize.Level4,
        marginTop: spaces.Small
      },
      button: {
        marginHorizontal: spaces.Medium,
        backgroundColor: colors.danger
      },
      infoBox: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor:'#FFF',
        shadowColor: "#d9d9d9",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        },
        paddingVertical: spaces.Medium,
        marginTop: spaces.Medium,
      },
      infoBoxData: {
        flex: 1,
        alignItems: 'center',
      }
    }),
  );
}

export default ComponentStyle;
