import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";

export default function UpdatePassword() {

    
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  return (
    <View style={styles.container}>
      {/* <Text> Update Password </Text> */}
      <Input
        style={styles.input}
        placeholder={"Password"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        style={styles.input}
        placeholder={"Confirm  Password"}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  input: {
    marginVertical: 8,
  },
});
