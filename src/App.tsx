
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import { User } from './types/User';
function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const uniqueCities = Array.from(new Set(users.map(user => user.address.city)));
	const [loading, setLoading] = useState(true);
	const filteredUsers = users
		.filter(user =>
			(user.firstName + ' ' + user.lastName).toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter(user =>
			selectedCity === '' || user.address.city === selectedCity
		);
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
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
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
				</div>
				<h1>Customer List</h1>
				
				<UserTable users={filteredUsers} />
				
			</div>
		</>
	);
}


export default App;