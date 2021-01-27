import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => {
         navigation.navigate("UpdatePassword")
      }}>
        <View
          style={{
         
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}> Update Password</Text>
          <MaterialIcons name="navigate-next" size={25} color="black" />
        </View>
      </TouchableOpacity>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 35,
    padding: 15,
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
  },
  text: {
    marginLeft: 20,
    // marginLeft: "20px",
    color: "#333333",
  },
});
