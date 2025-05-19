
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import { User } from './types/User';
import { filterByName, filterByCity, getOldestUsersByCity} from './utils/filters';
import SearchBar from './components/searchBar';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [rawSearchTerm, setRawSearchTerm] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
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

	
	if (loading) return <p>Loading users...</p>;
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<SearchBar
					rawSearchTerm={rawSearchTerm}
					setRawSearchTerm={setRawSearchTerm}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
					highlightOldest={highlightOldest}
					setHighlightOldest={setHighlightOldest}
					cities={uniqueCities}
				/>				
				<UserTable users={filteredUsers} highlightIds={oldestUsersByCity}/>

				
			</div>
		</>
	);
}


export default App;