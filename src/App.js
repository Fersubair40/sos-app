import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackNavigator from './navigators/AuthStackNavigator';
import { lightTheme } from './themes/light';
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';
import { BASE_URL } from './config';
import { sleep } from './utils/sleep';

const RootStack = createStackNavigator();
export default function App() {
	const auth = React.useMemo(
		() => ({
			login: async (username, password) => {
				await sleep(2000);
				await axios.post(`${BASE_URL}/login`, {
					username,
					password,
				});
			},
			logout: () => {
				console.log('logout');
			},
			register: async (username, fullName, password, emergency_contacts, phoneNumber) => {
				await sleep(2000);
				await axios.post(`${BASE_URL}/register`, {
					username,
					fullName,
					password,
					emergency_contacts,
					phoneNumber,
				});
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={auth}>
			<NavigationContainer theme={lightTheme}>
				<RootStack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<RootStack.Screen name={'RootStack'} component={AuthStackNavigator} />
				</RootStack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
