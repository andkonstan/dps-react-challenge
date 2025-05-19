// src/hooks/useUsers.ts
import { useEffect, useState } from 'react';
import { User } from '../types/User';

export function useUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://dummyjson.com/users')
			.then(res => res.json())
			.then(data => {
				setUsers(data.users);
				setLoading(false);
			})
			.catch(err => {
				console.error('Failed to fetch users:', err);
				setLoading(false);
			});
	}, []);

	return { users, loading };
}
