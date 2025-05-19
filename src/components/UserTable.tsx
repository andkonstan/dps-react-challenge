import { User } from '../types/User';
import { FC } from 'react';
import './UserTable.css';


interface Props {
	users: User[];
}

const UserTable: FC<Props> = ({ users, highlightIds }) => {
	return (
		<table className="user-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => {
					const isHighlighted = highlightIds?.get(user.address.city) === user.id;
					return (
						<tr
							key={user.id}
							style={{
								backgroundColor: isHighlighted ? '#4b5563' : 'transparent',
								fontWeight: isHighlighted ? 'bold' : 'normal'
							}}
						>
							<td>{user.firstName} {user.lastName}</td>
							<td>{user.address.city}</td>
							<td>{new Date(user.birthDate).toLocaleDateString('de-DE')}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
interface Props {
	users: User[];
	highlightIds?: Map<string, number>;
}
export default UserTable;
