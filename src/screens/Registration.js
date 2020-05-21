import React from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';

import { selectContact } from '../utils/selectContact';

const Toast = ({ visible, message }) => {
	if (visible) {
		ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
		return null;
	}
	return null;
};

export default function RegistratonScreen({ navigation }) {
	const { register } = React.useContext(AuthContext);
	const [username, setUsername] = React.useState('');
	const [fullName, setFullname] = React.useState('emii subair');
	const [password, setPassword] = React.useState('abc19decj');
	const [phoneNumber, setPhonenumber] = React.useState('+23409091421253');
	const [emergency_contacts, setContacts] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	// const [setContacts] = React.useState(getPhoneNumber);
	const [visibleToast, setvisibleToast] = React.useState(false);
	// const [selectedphone, setSelectedPhone] = React.useState(false)

	React.useEffect(() => setvisibleToast(false), [visibleToast]);

	const handleButtonPress = () => {
		setvisibleToast(true);
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Heading style={styles.title}>REGISTRATION</Heading>

				<Error error={error} />
				<Input style={styles.input} placeholder={'Username'} value={username} onChangeText={setUsername} />
				<Input style={styles.input} placeholder={'Fullname'} value={fullName} onChangeText={setFullname} />
				<Input
					style={styles.input}
					placeholder={'Password'}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<IconButton
					style={styles.closeIcon}
					name={'add'}
					onPress={() => {
						selectContact();
					}}
				/>
				
				<Input
					style={styles.input}
					placeholder={'Emergency Conatacts'}
					value={emergency_contacts}
					onChangeText={setContacts}
				/>
				<Input
					style={styles.input}
					placeholder={'Phone Number'}
					// keyboardType={'numbezr-pad'}
					value={phoneNumber}
					onChangeText={setPhonenumber}
				/>
				<FilledButton
					title={'REGISTER'}
					style={styles.loginbutton}
					onPress={async () => {
						try {
							setLoading(true);
							await register(username, fullName, password, emergency_contacts, phoneNumber);
							handleButtonPress();
							navigation.navigate('LoginStack');
						} catch (error) {
							// console.log(er)
							setError(error.message);
							setLoading(false);
						}
					}}
				/>
				<Loading loading={loading} />
				<Toast style={styles.toast} visible={visibleToast} message="Regisered Successfully" />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 28,
		paddingTop: 120,
		alignItems: 'center',
	},
	title: {
		// marginVertical:28,
		marginBottom: 40,
	},
	input: {
		marginVertical: 8,
	},
	loginbutton: {
		marginVertical: 30,
	},
	closeIcon: {
		// left: 0
		// position: 'absolute',
		// top: 30,
		right: 70,
	},
	toast: {
		paddingTop: Constants.statusBarHeight,
	},
});
