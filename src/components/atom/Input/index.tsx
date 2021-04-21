import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

const Input = ({ label, error, ...props }: any) => {
  const containerStyles: any = [styles.inputContainer];
  
  if (error) {
    containerStyles.push(styles.inputContainerError);
  }

  return (
    <View style={containerStyles}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.row}>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />
      </View>
    </View>
  );
};

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#f4f6f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#f4f6f8",
  },
  inputContainerError: {
    borderColor: "#cc0011",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 14,
    color: "#b4b6b8",
  },
  input: {
    color: "#353031",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 3,
    marginRight: 10,
    flex: 1,
  },
});