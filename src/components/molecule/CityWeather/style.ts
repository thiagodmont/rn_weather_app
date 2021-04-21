import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useFontSize, useSpaces } from "app/design"

export interface Styles {
  container: ViewStyle;
  name: TextStyle;
  temperature: TextStyle;
  add: TextStyle;
  weather: ViewStyle;
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
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
        paddingHorizontal: spaces.Large,
        paddingVertical: spaces.Medium,
        borderColor: "#E4C1F9",
        borderWidth: 1.5,
        borderRadius: 8
      },
      name: {
        color: "#353031",
        fontSize: fontSize.SmallBody,
        marginTop: spaces.Small,
      },
      temperature: {
        color: "#353031",
        fontWeight: "bold",
        fontSize: fontSize.Level2,
      },
      add: {
        color: "#353031",
        textAlign: 'center',
        fontSize: fontSize.MediumBody,
      },
      weather: {
        flex: 1,
      }
    }),
  );
}

export default ComponentStyle;
