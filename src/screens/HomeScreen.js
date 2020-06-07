import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet } from 'react-native';

import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';
import { sleep } from '../utils/sleep';
import { BASE_URL } from '../config';
import { UserContext } from '../contexts/UserContext';

export default function HomeScreen({ navigation }) {
	const { logout } = React.useContext(AuthContext);
	const user = React.useContext(UserContext);

	const token = user.token;
	const user_id = user.user_id;

	const initialValue = [];
	const [data, setData] = React.useState(initialValue);

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
		sleep(5000);
		axios
			.get(`${BASE_URL}/emergency-contacts/${user_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(({ data }) => {
				setData(data);
			});
	}, [token, user_id]);
	console.log(data);

	return (
		<View style={styles.container}>
			<Text> textInComponent </Text>
			<Text> {data[0]} </Text>
			<Text> {data[1]} </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
