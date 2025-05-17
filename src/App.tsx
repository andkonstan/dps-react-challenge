
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import { User } from './types/User';
function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [rawSearchTerm, setRawSearchTerm] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [selectedCity, setSelectedCity] = useState('');
	const uniqueCities = Array.from(new Set(users.map(user => user.address.city)));
	const [highlightOldest, setHighlightOldest] = useState(false);
	const oldestUsersByCity = new Map<string, number>();
	const filteredUsers = users
		.filter(user =>
			(user.firstName + ' ' + user.lastName).toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter(user =>
			selectedCity === '' || user.address.city === selectedCity
		);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSearchTerm(rawSearchTerm);
		}, 1000); // 1 second delay
		
		return () => clearTimeout(timeout); // Clear timeout if rawSearchTerm changes quickly
	}, [rawSearchTerm]);
	useEffect(() => {
		fetch('https://dummyjson.com/users')
			.then(res => res.json())
			.then(data => {
				setUsers(data.users);
				setLoading(false);
			})
			.catch(error => {
				console.error('Failed to fetch users:', error);
				setLoading(false);
			});
	}, []);

	
	if (highlightOldest) {
		filteredUsers.forEach(user => {
			const currentOldest = oldestUsersByCity.get(user.address.city);
			const userBirthTime = new Date(user.birthDate).getTime();
	
			if (
				currentOldest === undefined ||
				userBirthTime < new Date(users.find(u => u.id === currentOldest)!.birthDate).getTime()
			) {
				oldestUsersByCity.set(user.address.city, user.id);
			}
		});
	}
	if (loading) return <p>Loading users...</p>;
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
					<input
						type="text"
						placeholder="Search by name..."
						value={rawSearchTerm}
						onChange={(e) => setRawSearchTerm(e.target.value)}
						style={{ padding: '0.5rem', flex: 2 }}
					/>

					<select
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.target.value)}
						style={{ padding: '0.5rem', flex: 1 }}
					>
						<option value="">Select city</option>
						{uniqueCities.map(city => (
							<option key={city} value={city}>{city}</option>
						))}
					</select>
					<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					Highlight oldest  per city
						<input
							type="checkbox"
							checked={highlightOldest}
							onChange={(e) => setHighlightOldest(e.target.checked)}
						/>

					</label>
				</div>
				<h1>Customer List</h1>
				
				<UserTable users={filteredUsers} highlightIds={highlightOldest ? oldestUsersByCity : undefined} />

				
			</div>
		</>
	);
}


export default App;