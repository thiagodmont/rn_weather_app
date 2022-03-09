import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Colors, FontSize } from 'app/design'
import { Space } from 'app/design/withSpaceProps'

export interface Styles {
  container: ViewStyle;
  input: ViewStyle;
}

interface IComponentStyle {
  style: any;
  error?: boolean;
  disabled?: boolean;
  children: (styles: Styles) => any;
}

const ComponentStyle: React.FC<IComponentStyle> = ({
  style,
  error,
  disabled,
  children,
}) => {
  return children(
    StyleSheet.create({
      container: {
        ...style,
        backgroundColor: "#f4f6f8",
        paddingVertical: Space.Small,
        paddingHorizontal: Space.Medium,
        borderRadius: 10,
        marginVertical: Space.XSmall,
        borderWidth: 1,
        borderColor: error ? Colors.Red : "#f4f6f8",
      },
      input: {
        color: "#353031",
        fontWeight: "bold",
        fontSize: FontSize.Subtitle,
        marginTop: Space.XSmall,
        marginRight: Space.Small,
      },
    }),
  );
};

export default ComponentStyle;
