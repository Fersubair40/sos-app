import React from 'react';
import { View, StyleSheet } from 'react-native';
import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';
// import { IconButton } from '../components/IconButton';

export default function LoginScreen({ navigation }) {
	const { login } = React.useContext(AuthContext);
	const [username, setUsername] = React.useState('sube');
	const [password, setPassword] = React.useState('19dec1998');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

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
						setLoading(false)
						navigation.navigate('LoginStack');
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
