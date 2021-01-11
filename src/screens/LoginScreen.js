import React from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Constants from "expo-constants";

import Heading from "../components/Heading";
import Input from "../components/Input";
import FilledButton from "../components/FilledButton";
import { TextButton } from "../components/TextButton";
import { Error } from "../components/Error";
import { AuthContext } from "../contexts/AuthContext";
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

export default function LoginScreen({ navigation }) {
  const { login } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [visibleToast, setvisibleToast] = React.useState(false);

  React.useEffect(() => setvisibleToast(false), [visibleToast]);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        try {
          if (!(await checkPermissions())) {
            await requestPermissions();
          }
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, []);
  async function checkPermissions() {
    console.log("checking SMS permissions");
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS
      );
      if (!hasPermissions) return false;
    } catch (e) {
      console.error(e);
    }
    return hasPermissions;
  }

  async function requestPermissions() {
    let granted = {};
    try {
      console.log("requesting SMS permissions");
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
        ],
        {
          title: "Example App SMS Features",
          message: "Example SMS App needs access to demonstrate SMS features",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use SMS features");
      } else {
        console.log("SMS permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const handleButtonPress = () => {
    setvisibleToast(true);
  };
  const handleRequestError = () => {
    if (login.status !== 200) {
      setError("Username or password is Incorrect");
    }
  };
  //   const handleValidationError = () => {

  //   };
  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Login</Heading>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={"Username"}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        style={styles.input}
        placeholder={"Password"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={"lOGIN"}
        style={styles.loginbutton}
        onPress={async () => {
          try {
            setLoading(true);
            if (username && password !== "") {
              await login(username, password);
              setLoading(false);
              handleButtonPress();
              // setError('helo')
              // setLoading(false)
            } else {
              setError("Username and Password is required");
              setLoading(false);
            }

            // navigation.navigate('LoginStack');
          } catch (error) {
            handleRequestError();
            // setError(error);
            setLoading(false);
          }
        }}
      />
      <TextButton
        title={"Dont have an account? Create one "}
        onPress={() => {
          navigation.navigate("OnBoard");
        }}
      />
      <Loading loading={loading} />
      <Toast
        style={styles.toast}
        visible={visibleToast}
        message="Logged In Successfully"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    alignItems: "center",
  },
  title: {
    marginBottom: 40,
  },
  input: {
    marginVertical: 8,
  },
  loginbutton: {
    marginVertical: 32,
  },
  toast: {
    paddingTop: Constants.statusBarHeight,
  },
});
