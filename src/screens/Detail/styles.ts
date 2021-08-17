import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { FontSize, Spaces, Colors } from 'app/design'

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
  
  return children(
    StyleSheet.create<Styles>({
      box: {
        flex: 1,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.White,
        paddingHorizontal: Spaces.Large,
        paddingTop: Spaces.Large,
      },
      tempeture: {
        fontSize: FontSize.Level2,
        marginTop: Spaces.Medium
      },
      city: {
        fontSize: FontSize.Level4,
        marginTop: Spaces.Small
      },
      button: {
        marginHorizontal: Spaces.Medium,
        backgroundColor: Colors.Red
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
        paddingVertical: Spaces.Medium,
        marginTop: Spaces.Medium,
      },
      infoBoxData: {
        flex: 1,
        alignItems: 'center',
      }
    }),
  );
}

export default ComponentStyle;
