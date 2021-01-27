import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Settings from "../screens/Settings";
import UpdatePassword from "../screens/UpdatePassword";

const MainStack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={"Home"}
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          headerTitleStyle: { alignSelf: "center" },
          headerLeft: () => (
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate("Settings")
            }}>
              <Feather name="settings" size={24} color="420a2b" />
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen
        name={"Settings"}
        component={Settings}
        options={{
          title: "Setting",
        }}
      />
      <MainStack.Screen name={"UpdatePassword"} component={UpdatePassword} options={{
        title: ""
      }} />

    </MainStack.Navigator>

    // <LoginScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginLeft: 10,
  },
});
