
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
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
				<h1>Customer List</h1>
				<UserTable users={users} />
			</div>
		</>
	);
}


export default App;