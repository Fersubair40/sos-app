// // import React, { useState, useEffect } from "react";
// // import * as Location from "expo-location";
// // import * as Permissions from "expo-permissions";
// // import { Alert, View, Text } from "react-native";

// // export default (callback, shouldTrack) => {
// //   const [err, setError] = useState();
// //   const [errorMsg, setErrorMsg] = React.useState(null);
// //   const [location, setLocation] = useState(null);
// //   const [update, setUpdate] = useState(false)

// //   React.useEffect(() => {
// //     (async () => {
// //       let { status } = await Location.requestPermissionsAsync();
// //       if (status !== "granted") {
// //         setErrorMsg("Permission to access location was denied");
// //       }

// //       let location = await Location.getCurrentPositionAsync({
// //         enableHighAccuracy: true,
// //         accuracy: Location.Accuracy.BestForNavigation,
// //       });
// //       setLocation(location);

// //       const subscribe = await Location.watchPositionAsync(
// //         {
// //           accuracy: Location.Accuracy.BestForNavigation,
// //           timeInterval: 2000,
// //           distanceInterval:0,
// //         },
// //        (location) => {
// //          setLocation(location)
// //        }
// //       );

// //       console.log(subscribe);
// //     })();
// //   },[]);

// //   const onSubscribe = () => {
// //       setUpdate(false)
// //       setLocation(null)
// //   }

// //   let text = 'Waiting..';
// //     if (errorMsg) {
// //         text = errorMsg;
// //     } else if (location) {
// //         text = JSON.parse(JSON.stringify(location));
// //         console.log(text)
// //     }
// //   //   useEffect(() => {
// //   //     if (shouldTrack) {
// //   //       startWatching();
// //   //     } else {
// //   //       subscriber.remove();
// //   //     }
// //   //     subscriber ? subscriber.remove() : null;
// //   //     return () => {
// //   //       if (subscriber) {
// //   //         subscriber.remove();
// //   //       }
// //   //     };
// //   //   }, [shouldTrack, callback]);

// //   return (
// //     <View>
// //       <Text> hello </Text>
// //     </View>
// //   );
// // };
// import Expo from "expo";
// import React, { Component } from "react";
// import { Platform, Text, View, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import MapView from "react-native-maps";


// const GEOLOCATION_OPTIONS = {
//   enableHighAccuracy: true,
//   mayShowUserSettingsDialog: true,
//   timeInterval: 10000,
// };

// export default function LocScreen()  {
//   const [location, setLocation] = React.useState({ coords: { latitude: 0, longitude: 0 }})
//   // state = {
//   //   location: { coords: { latitude: 0, longitude: 0 } },
//   // };

//   // componentWillMount() {
//   //   Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
//   // }

//   React.useEffect(() => {
//     Location.watchPositionAsync(GEOLOCATION_OPTIONS, locationChanged);
//   }, [location.coords.latitude, location.coords.longitude])

//   const locationChanged = (location) => {
//     ({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.1,
//       longitudeDelta: 0.05,
//     }),
//       setLocation(location);
//     console.log(
//      location
//     );
//   };

  
//     return (
//       <View>
//         <Text>{location.coords.longitude}</Text>
//         <Text>{location.coords.latitude}</Text>
//       </View>
//     );
  
// }
