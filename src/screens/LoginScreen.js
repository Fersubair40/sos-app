import React from 'react';
import { View, StyleSheet } from 'react-native';
import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';

const Toast = ({ visible, message }) => {
	if (visible) {
		ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
		return null;
	}
	return null;
};

export default function LoginScreen({ navigation }) {
	const { login } = React.useContext(AuthContext);
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [visibleToast, setvisibleToast] = React.useState(false);

	React.useEffect(() => setvisibleToast(false), [visibleToast]);

	const handleButtonPress = () => {
		setvisibleToast(true);
	};
	return (
		<View style={styles.container}>
			<Heading style={styles.title}>Login</Heading>
			<Error error={error} />
			<Input style={styles.input} placeholder={'Username'} value={username} onChangeText={setUsername} />
			<Input
				style={styles.input}
				placeholder={'Password'}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<FilledButton
				title={'lOGIN'}
				style={styles.loginbutton}
				onPress={async () => {
					try {
						setLoading(true);
						await login(username, password);
						setLoading(false);
						handleButtonPress();
						// navigation.navigate('LoginStack');
					} catch (error) {
						setError(error.message);
						setLoading(false);
					}
				}}
			/>
			<TextButton
				title={'Dont have an accont? Create one '}
				onPress={() => {
					navigation.navigate('Registration');
				}}
			/>
			<Loading loading={loading} />
			<Toast style={styles.toast} visible={visibleToast} message="Login Successfully" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
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
		marginVertical: 32,
	},
});
