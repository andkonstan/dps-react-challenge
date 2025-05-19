
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import { User } from './types/User';
import { filterByName, filterByCity, getOldestUsersByCity} from './utils/filters';
import SearchBar from './components/searchBar';
import { useDebouncedValue } from './hooks/useDebouncedValue';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [rawSearchTerm, setRawSearchTerm] = useState('');
	const searchTerm = useDebouncedValue(rawSearchTerm, 1000);
	const [loading, setLoading] = useState(true);
	const [selectedCity, setSelectedCity] = useState('');
	const uniqueCities = Array.from(new Set(users.map(user => user.address.city)));
	const [highlightOldest, setHighlightOldest] = useState(false);
	const filteredUsers = filterByCity(
		filterByName(users, searchTerm),
		selectedCity
	);
	const oldestUsersByCity = highlightOldest
		? getOldestUsersByCity(filteredUsers)
		: undefined;


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

	

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				{loading ? (
					<p>Loading users...</p>
				) : (
					<>
						<SearchBar
							rawSearchTerm={rawSearchTerm}
							setRawSearchTerm={setRawSearchTerm}
							selectedCity={selectedCity}
							setSelectedCity={setSelectedCity}
							highlightOldest={highlightOldest}
							setHighlightOldest={setHighlightOldest}
							cities={uniqueCities}
						/>
						<UserTable
							users={filteredUsers}
							highlightIds={oldestUsersByCity}
						/>
					</>
				)}
			</div>
		</>
	);
}


export default App;