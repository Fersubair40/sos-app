import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
	const {logout} = React.useContext(AuthContext);

	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderIconButton name={'logout'} onPress={() => {
				logout()
			}} />,
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Text> textInComponent </Text>
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
