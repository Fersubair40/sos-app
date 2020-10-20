import React from "react";
import { NativeModules, Text } from "react-native";

const SharedStorage = NativeModules.SharedStorage;

export default function Widget() {
  React.useEffect(() => {
    SharedStorage.set(JSON.stringify({ text: "click " }));
  }, []);
  return(
      <Text>hi</Text>
  )
}
