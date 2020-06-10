import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import * as Location from 'expo-location';
import SmsAndroid from 'react-native-get-sms-android';

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
	// console.log(data.data);

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
			let phoneNumbers = {
				addressList: ['+911212121212', '+911212121212'],
			};
			let message = 'This is automated test message';

			const sendSms = () => {
				SmsAndroid.autoSend(
					JSON.stringify(phoneNumbers),
					message,
					(fail) => {
						console.log('Failed with this error: ' + fail);
					},
					(success) => {
						console.log('SMS sent successfully' + success);
					}
				);
			};
			return (
				<View style={styles.container}>
					<TouchableOpacity style={styles.button} onPress={sendSms()}>
						<Text>Send SMS</Text>
					</TouchableOpacity>
				</View>
			);
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
	button: {
		padding: 10,
		borderWidth: 0.5,
		borderColor: '#bbb',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
