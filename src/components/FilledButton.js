import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function FilledButton({ title, style, onPress }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text style={styles.text}>{title.toUpperCase()}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#420a2b",
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        padding: 15,
        borderRadius:18,
    },
    text:{
        color:'white',
        fontWeight:'500',
        fontSize: 16,
    }
});
