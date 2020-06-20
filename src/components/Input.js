import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';

export default function Input({ children, style, ...props }) {
	return <TextInput {...props} style={[style, styles.input]} placeholderTextColor={'darkgray'} />;
}

const styles = StyleSheet.create({
	input: {
		fontSize: 20,
		backgroundColor: '#e8e8e8',
		width: '100%',
		padding: 15,
		borderRadius: 8,
	},
});
