import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
	return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'purple',
	},
});
