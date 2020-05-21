import { DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
        ...DefaultTheme.colors,
		background: 'white',
	},
};
