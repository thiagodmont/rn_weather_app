import React from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle
} from "react-native"

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
    backgroundColor: "#9374b7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  disabled: {
    opacity: 0.6
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});