import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SplashImage } from "../Image";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={SplashImage} style={{width: "100%", height: 250}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
});
