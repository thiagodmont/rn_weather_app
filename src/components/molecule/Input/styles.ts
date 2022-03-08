import { StyleSheet, ViewStyle, Platform } from 'react-native'
import { Colors } from 'app/design'
import { getValueByScale, Space } from 'app/design/withSpaceProps'

export interface Styles {
  container: ViewStyle;
  box: ViewStyle;
  input: ViewStyle;
  voice: ViewStyle;
}

interface IComponentStyle {
  style: any;
  error?: string | null;
  disabled?: boolean;
  inputHeight?: number;
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  style,
  error,
  disabled,
  inputHeight,
  children,
}) => {
  return children(
    StyleSheet.create({
      container: {
        ...style,
      },
      box: {
        borderWidth: 1,
        borderColor: error ? Colors.Red : Colors.GreyMedium,
        borderRadius: 4,
      },
      input: {
        flex: 1,
        paddingLeft: getValueByScale(Space.Medium),
        marginTop: getValueByScale(Space.Small),
        backgroundColor: disabled ? Colors.GreyLight : undefined,
        color: Colors.Black,
        height: inputHeight ? inputHeight : undefined,
        //fontFamily: "AvenirLTPro-Book",
        ...Platform.select({
          ios: {
            paddingVertical: Space.Medium
          },
        })
      },
      voice: {
        justifyContent: "flex-end",
      }
    }),
  );
};

export default ComponentStyle;
  