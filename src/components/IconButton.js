import React from 'react';
import { Icon } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';


import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function IconButton({ name, style, onPress }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Entypo  name={name} size={20} color={'#420a2b'} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {},
});
