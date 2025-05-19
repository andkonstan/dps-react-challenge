
import { useEffect, useState } from 'react';

import dpsLogo from './assets/DPS.svg';

import './App.css';

import UserTable from './components/UserTable';
import SearchBar from './components/searchBar';

import { User } from './types/User';

import { filterByName, filterByCity, getOldestUsersByCity} from './utils/filters';

import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useUsers } from './hooks/useUsers';

function App() {

	const { users, loading } = useUsers();
	const [rawSearchTerm, setRawSearchTerm] = useState('');
	const searchTerm = useDebouncedValue(rawSearchTerm, 1000);
	const [selectedCity, setSelectedCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

	const uniqueCities = Array.from(
		new Set(users.map(user => user.address.city))
	);
	
	const filteredUsers = filterByCity(
		filterByName(users, searchTerm),
		selectedCity
	);
	const oldestUsersByCity = highlightOldest
		? getOldestUsersByCity(filteredUsers)
		: undefined;

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