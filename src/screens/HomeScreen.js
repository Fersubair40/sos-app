import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import * as Location from 'expo-location';
import SmsAndroid from 'react-native-android-sms';
import AsyncStorage from '@react-native-community/async-storage';

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
	const [number, setNumber] = React.useState(initialValue);
	const [data, setData] = React.useState(initialValue);

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
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.parse(JSON.stringify(location));
	}

	function renderNumber() {
		if (loading) {
			return <Loading loading={loading} />;
		} else {
			const emergencyNumber = {
				firstNumber: data.data[0],
				sencondNumber: data.data[1],
			};
			AsyncStorage.setItem('emergencyNumber', JSON.stringify(emergencyNumber));

			function sendSmsFunction() {
				let phoneNumbers = {
					addressList: ['+911212121212', '+911212121212'],
				};
				let message = 'This is automated test message';
				SmsAndroid.autoSend(
					phoneNumbers,
					message,
					(fail) => {
						console.log('Failed with this error: ' + fail);
					},
					(success) => {
						console.log('SMS sent successfully' + success);
					}
				);
			}
			return (
				<View style={styles.container}>
					<TouchableOpacity style={styles.button} onPress={sendSmsFunction()}>
						<Text> Send SMS </Text>{' '}
					</TouchableOpacity>{' '}
				</View>
			);
		}
	}

	React.useEffect(() => {
		AsyncStorage.getItem('emergencyNumber').then((emergencyNumber) => {
			setNumber(JSON.parse(emergencyNumber));
		});
	}, []);

	function isNumberSaved() {
		if (number) {
			function sendSmsFunction() {
				var phoneNumbers = {
					addressList: [number.firstNumber, number.sencondNumber],
				};
				var message = `See my location here: http://maps.google.com/maps?q=${text.coords.latitude},${text.coords.longitude} please pay close attention to where i am `;
				SmsAndroid.send(
					JSON.stringify(phoneNumbers),
					message,
					(fail) => {
						console.log('Failed with this error: ' + fail);
					},
					(success) => {
						console.log('SMS sent successfully' + success);
					}
				);
			}
			return (
				<View>
					<Text> {number.firstNumber} </Text> <Text> {number.sencondNumber} </Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							sendSmsFunction();
						}}
					>
						<Text> Send SMS </Text>{' '}
					</TouchableOpacity>{' '}
				</View>
			);
		} else {
			return renderNumber();
		}
	}

	return <View style={styles.container}> {isNumberSaved()} </View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		padding: 10,
		borderWidth: 0.5,
		borderColor: '#bbb',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
