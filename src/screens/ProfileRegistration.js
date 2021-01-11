import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import Input from "../components/Input";
import Heading from "../components/Heading";
import { Error } from "../components/Error";

export default function ProfileRegistration({ navigation }) {
  const [diableBtn, setDisableBtn] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [fullName, setFullname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (username && fullName && password && confirmPassword !== null) {
      setDisableBtn(false);
    }

    if (password !== confirmPassword && confirmPassword !== null) {
      setError("password doesn't match");
      setDisableBtn(true);
    } else if (password === confirmPassword) {
      setError("");
    }
  }, [password, confirmPassword, username, fullName]);

  const next = () => {
    navigation.navigate("Registration");
  };

  const saveRegistration = async () => {
    if (username && fullName && password && confirmPassword !== "") {
      const profileData = {
        username,
        fullName,
        password,
      };
    //   console.log(profileData);
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));
    }
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.heading}> Personal Info Section </Heading>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={"Username"}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        style={styles.input}
        placeholder={"Fullname"}
        value={fullName}
        onChangeText={setFullname}
      />
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

      {diableBtn ? (
        <TouchableOpacity
          style={styles.diableBtn}
          disabled={diableBtn}
          onPress={async () => {
            await saveRegistration();
            next();
          }}
        >
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Next</Text>
            <MaterialIcons name="navigate-next" size={34} color="white" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await saveRegistration();
            next();
          }}
        >
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Next</Text>
            <MaterialIcons name="navigate-next" size={34} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 120,
  },
  onboardbtn: {
    marginVertical: 30,
  },
  btn: {
    backgroundColor: "#420a2b",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // padding: 5,
    borderRadius: 20,
  },
  diableBtn: {
    backgroundColor: "#ad9d9d",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // padding:    15,
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  input: {
    marginVertical: 8,
  },
  heading: {
    marginBottom: 30,
  },
});
