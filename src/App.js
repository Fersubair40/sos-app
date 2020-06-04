import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackNavigator from './navigators/AuthStackNavigator';
import { lightTheme } from './themes/light';
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';
import { BASE_URL } from './config';
import { sleep } from './utils/sleep';
import { createAction } from './config/createAction';
import MainStackNavigator from './navigators/MainStackNavigator';

const RootStack = createStackNavigator();
export default function App() {
	const [state, dispatch] = React.useReducer(
		(state, action) => {
			switch (action.type) {
				case 'SET_USER':
					return {
						...state,
						user: { ...action.payload },
					};
				case 'REMOVE_USER':
					return {
						...state,
						user: undefined,
					};
				default:
					return state;
			}
		},
		{
			user: undefined,
		}
	);

	const auth = React.useMemo(
		() => ({
			login: async (username, password) => {
				await sleep(2000);
				const { data } = await axios.post(`${BASE_URL}/login`, {
					username,
					password,
				});
				const user = {
					user_id: data.user_id,
					token: data.access_token,
				};
				dispatch(createAction('SET_USER', user));
			},
			logout: () => {
				dispatch(createAction('REMOVE_USER'));
			},
			register: async (username, fullName, password, emergency_contacts, phoneNumber) => {
				await sleep(2000);
				const result = await axios.post(`${BASE_URL}/register`, {
					username,
					fullName,
					password,
					emergency_contacts,
					phoneNumber,
				});
				console.log(result);
			},
		}),
		[]
	);

	console.log(state.user);

	return (
		<AuthContext.Provider value={auth}>
			<NavigationContainer theme={lightTheme}>
				<RootStack.Navigator
					screenOptions={{
						headerShown: false,
						animationEnabled: false,
					}}
				>
					{state.user ? (
						<RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
					) : (
						<RootStack.Screen name={'RootStack'} component={AuthStackNavigator} />
					)}
				</RootStack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
