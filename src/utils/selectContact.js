import { selectContactPhone } from 'react-native-select-contact';

export function selectContact() {
	return selectContactPhone().then((selection) => {
		if (!selection) {
			return null;
		}

		let { selectedPhone } = selection;
		console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
		return selectedPhone.number;
	});
}
