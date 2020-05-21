import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';

export default function Input({ children, style, ...props }) {
	return <TextInput {...props} style={[style, styles.input]} placeholderTextColor={'darkgray'} />;
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#e8e8e8',
		width: '100%',
		padding: 20,
		borderRadius: 8,
	},
});
