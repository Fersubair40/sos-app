import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const MainStack = createStackNavigator();

export default function MainStackNavigator() {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				name={'Home'}
				component={HomeScreen}
				options={{
					title: 'Home',
				}}
			/>
		</MainStack.Navigator>

		// <LoginScreen/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
