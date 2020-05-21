import React from 'react';
import { Icon } from 'react-native-elements';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function IconButton({ name, style, onPress }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Icon  name={name} color={'#45046a'} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {},
});
