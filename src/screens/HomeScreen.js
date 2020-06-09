import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';
import * as SMS from 'expo-sms';

import { Loading } from '../components/Loading';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';

import { BASE_URL } from '../config';
import { UserContext } from '../contexts/UserContext';

export default function HomeScreen({ navigation }) {
	const { logout } = React.useContext(AuthContext);
	const user = React.useContext(UserContext);

	const token = user.token;
	const user_id = user.user_id;

	const initialValue = [];
	const [location, setLocation] = React.useState(null);
	const [errorMsg, setErrorMsg] = React.useState(null);
	const [data, setData] = React.useState(initialValue);
	const [number, setNumber] = React.useState('');
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<HeaderIconButton
					name={'log-out'}
					onPress={() => {
						logout();
					}}
				/>
			),
		});
	}, [navigation]);

	React.useEffect(() => {
		axios
			.get(`${BASE_URL}/emergency-contacts/${user_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(({ data }) => {
				setData(data);
				setLoading(false);
			});
	}, [token, user_id]);

	React.useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	});

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
		//   console.log(text);
	}

	function renderNumber() {
		if (loading) {
			return <Loading loading={loading} />;
		} else {
			const isAvailable = SMS.isAvailableAsync();
			if (isAvailable) {
				const { result } = SMS.sendSMSAsync(['7686688687', data.data[1]], 'My sample HelloWorld message');
				return <Button onPress={() => [result]} title={'pressme'} />;
			} else {
				Alert('sms is not avaiable');
			}
		}
	}

	return <View style={styles.container}>{renderNumber()}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
