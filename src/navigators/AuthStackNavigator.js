import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistratonScreen from '../screens/Registration';
import LoginScreen from '../screens/LoginScreen';

const LoginStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
	return (
		<AuthStack.Navigator
			mode={'modal'}
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Screen name={'LoginStack'}>
				{() => (
					<LoginStack.Navigator
						mode={'card'}
						screenOptions={{
							headerShown: false,
						}}
					>
						<LoginStack.Screen name={'Login'} component={LoginScreen} />
					</LoginStack.Navigator>
				)}
			</AuthStack.Screen>
			<AuthStack.Screen name={'Registration'} component={RegistratonScreen} />
		</AuthStack.Navigator>

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
