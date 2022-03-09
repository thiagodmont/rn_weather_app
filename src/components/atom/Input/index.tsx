import React from "react"
import { TextInput, ViewProps, TextInputProps } from "react-native"
import { Box, Body } from "app/components/atom"
import { Colors } from "app/design"
import withSpaceProps, { Space } from "app/design/withSpaceProps"
import withModifiersProps from "app/design/withModifiersProps"

import ComponentStyle from "./styles"

interface Props {
  label: string;
  error?: boolean;
  style?: ViewProps;
}

const Input = ({ label, error, style, ...props }: Props & TextInputProps) => {
  return (
    <ComponentStyle style={style} error={error}>
      {(styles) => (
        <Box style={styles.container}>
          <Body color={Colors.GreyDark}>{label}</Body>

          <Box row mt={Space.XSmall}>
            <TextInput autoCapitalize="none" style={styles.input} {...props} />
          </Box>
        </Box>
      )}
    </ComponentStyle>
  );
};

export default withSpaceProps(withModifiersProps(Input))
