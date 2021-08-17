import React from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle
} from "react-native"

import { Colors, Spaces, FontSize } from "app/design"

type Props = {
  text: string;
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
}

const Button = ({ text, style, onPress, loading = false, ...props }: Props) => {
  return (
    <TouchableOpacity {...props} onPress={onPress} style={[styles.button, style, loading && styles.disabled]} disabled={loading}>
      {loading ? <ActivityIndicator color={"#FFFFFF"} /> : <Text style={styles.buttonText}>{text}</Text> }
    </TouchableOpacity>
  );
};

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spaces.Medium,
    borderRadius: 10,
    marginTop: Spaces.Medium,
  },
  disabled: {
    opacity: 0.6
  },
  buttonText: {
    color: "#fff",
    fontSize: FontSize.SmallBody,
    fontWeight: "bold",
  },
});
