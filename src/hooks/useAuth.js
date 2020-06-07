import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '../config';
import { createAction } from '../config/createAction';
import { sleep } from '../utils/sleep';

export function useAuth() {
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
				case 'SET_LOADING':
					return {
						...state,
						loading: action.payload,
					};
				default:
					return state;
			}
		},
		{
			user: undefined,
			loading: true,
		}
	);
	const auth = React.useMemo(
		() => ({
			login: async (username, password) => {
				const { data } = await axios.post(`${BASE_URL}/login`, {
					 username,
					password,
				});
				const user = {
					user_id: data.user_id,
					token: data.access_token,
				};
				await  AsyncStorage.setItem('user', JSON.stringify(user));
				dispatch(createAction('SET_USER', user));
			},
			logout: async () => {
				await AsyncStorage.removeItem('user');
				dispatch(createAction('REMOVE_USER'));
			},
			register: async (username, fullName, password, emergency_contacts, phoneNumber) => {
				await sleep(2000);
				await axios.post(`${BASE_URL}/register`, {
					username: username,
					fullName,
					password,
					emergency_contacts,
					phoneNumber,
				});
			},
		}),
		[]
	);
	  React.useEffect(() => {
	    sleep(2000).then(() => {
	      AsyncStorage.getItem('user').then(user => {
	        if (user) {
	          dispatch(createAction('SET_USER', JSON.parse(user)));
	        }
	        dispatch(createAction('SET_LOADING', false));
	      });
	    });
	  }, []);
	return { auth, state };
}
