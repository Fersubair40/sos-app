import Axios from "axios";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import axios from "axios";

import Input from "../components/Input";
import Heading from "../components/Heading";
import { BASE_URL } from "../config";
import { UserContext } from "../contexts/UserContext";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50
    );
    return null;
  }
  return null;
};

export default function UpdatePassword({navigation}) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const user = React.useContext(UserContext);
  const [error, setError] = React.useState("");
  const [diableBtn, setDisableBtn] = React.useState(true);
  const [visibleToast, setvisibleToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const token = user.token;
  const user_id = user.user_id;

  React.useEffect(() => setvisibleToast(false), [visibleToast]);

  React.useEffect(() => {
    if (password && confirmPassword !== null) {
      setDisableBtn(false);
    }
    if (password !== confirmPassword && confirmPassword !== null) {
      setError("password doesn't match");
      setDisableBtn(true);
    } else if (password === confirmPassword) {
      setError("");
    }
  }, [password, confirmPassword]);

  const updatePassword = () => {
    const params = {
      user_id: user_id,
      password,
    };
    setLoading(true);
    axios
      .post(`${BASE_URL}/reset-password`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false)
      });
  };

  const handleButtonPress = () => {
    setvisibleToast(true);
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Update Password</Heading>
      {/* <Text> Update Password </Text> */}
      <Error error={error} />
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
            await updatePassword();
            handleButtonPress();
          }}
        >
          <Text style={styles.text}>UPDATE PASSWORD</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await updatePassword();
           handleButtonPress();
           navigation.navigate("Home")
          }}
        >
          <Text style={styles.text}>Update Password</Text>
        </TouchableOpacity>
      )}
       <Loading loading={loading} />
       <Toast
            style={styles.toast}
            visible={visibleToast}
            message="Password Updated"
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
  title: {
    marginBottom: 40,
  },
  diableBtn: {
    backgroundColor: "#ad9d9d",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "#420a2b",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
