import { User } from '../types/User';

export function filterByName(users: User[], term: string): User[] {
	return users.filter(user =>
		(user.firstName + ' ' + user.lastName).toLowerCase().includes(term.toLowerCase())
	);
}

export function filterByCity(users: User[], city: string): User[] {
	if (!city) return users;
	return users.filter(user => user.address.city === city);
}


export function getOldestUsersByCity(users: User[]): Map<string, number> {
	const map = new Map<string, number>();

	users.forEach(user => {
		const currentId = map.get(user.address.city);
		const userBirth = new Date(user.birthDate).getTime();

		if (
			currentId === undefined ||
      userBirth < new Date(users.find(u => u.id === currentId)!.birthDate).getTime()
		) {
			map.set(user.address.city, user.id);
		}
	});

	return map;
}