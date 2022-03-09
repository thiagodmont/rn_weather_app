import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { FontSize, Spaces } from "app/design"

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
  return children(
    StyleSheet.create<Styles>({
      container: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
        paddingHorizontal: Spaces.Large,
        paddingVertical: Spaces.Medium,
        borderColor: "#E4C1F9",
        borderWidth: 1.5,
        borderRadius: 8
      },
      name: {
        color: "#353031",
        fontSize: FontSize.Body,
        marginTop: Spaces.Small,
      },
      temperature: {
        color: "#353031",
        fontWeight: "bold",
        fontSize: FontSize.Level2,
      },
      add: {
        color: "#353031",
        textAlign: 'center',
        fontSize: FontSize.Subtitle,
      },
      weather: {
        flex: 1,
      }
    }),
  )
}

export default ComponentStyle;
