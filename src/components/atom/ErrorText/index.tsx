import React from "react"
import {
  StyleSheet,
  Text,
  View,
} from "react-native"

type Props = {
  message: string
}

const ErrorText = ({ message = "" }: Props) => {

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  )
}

export default ErrorText

const styles = StyleSheet.create({
  errorContainer: {
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 14,
    color: "#cc0011",
  }
})