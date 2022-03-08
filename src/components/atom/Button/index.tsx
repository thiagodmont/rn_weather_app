import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { Body, Loading, Image, Box } from 'app/components/atom'
import { Colors, FontWeight } from 'app/design'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps, { Space } from 'app/design/withSpaceProps'
import withBorderProps from 'app/design/withBorderProps'
import { FormFieldValues, useForm } from 'app/components/molecule/Form'
import { ImageStatic } from 'app/components/atom/Image'
import ComponentStyle from 'app/components/atom/Button/styles'
import Text from 'app/components/atom/Text'

type Props = {
  text: string;
  textColor?: Colors;
  textWeight?: FontWeight;
  icon?: ImageStatic;
  iconFill?: Colors;
  iconCenter?: boolean;
  color?: Colors;
  style?: ViewStyle;
  onPress?: () => void;
  onSubmit?: (values?: FormFieldValues) => void;
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  outline?: boolean;
}

const Button = ({ 
  text,
  textColor,
  textWeight = FontWeight.Normal,
  icon,
  iconFill,
  iconCenter,
  color = Colors.Primary,
  onPress,
  onSubmit,
  loading = false,
  disabled = false,
  rounded = false,
  outline = false,
  shadow = false,
  style,
  ...props
}: Props) => {
  const useFormContext = useForm()
  
  const onHandlePress = () => {
    onPress && onPress()
    onSubmit && onSubmit(useFormContext?.fieldsValue)
  }

  return (
    <ComponentStyle style={style} color={color} rounded={rounded} outline={outline} shadow={shadow}>
      {(styles) => (
        <TouchableOpacity {...props} onPress={onHandlePress} style={[style, styles.container, (loading || disabled) && styles.disabled]} disabled={loading || disabled}>
          {loading ? ( 
            <Loading color={Colors.White} />
          ) : (
            <Box row centerV>
              {icon && <Image ml={iconCenter ? 0 : Space.Medium} mr={text ? Space.Small : Space.Medium} image={icon} imageFill={iconFill} size={{ width: 21, height: 21 }}  />}
              <Text flex={!iconCenter} textCenter color={outline && !textColor ? Colors.Black : textColor || Colors.White} fontSize={18} weight={textWeight}>{text}</Text>
              {(icon && text.length > 0 && !iconCenter) && <Box width={21} mr={Space.Medium} ml={Space.Small} />}
            </Box>
          )}
        </TouchableOpacity>
      )}
    </ComponentStyle>
  );
};

export default withBorderProps(withSpaceProps(withModifiersProps(Button)))