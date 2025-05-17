// src/components/UserTable.tsx
import { User } from '../types/User';
import { FC } from 'react';



interface Props {
	users: User[];
}

const UserTable: FC<Props> = ({ users, highlightIds }) => {
	return (
		<table border={1} cellPadding={8}>
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<tr
						key={user.id}
						style={{
							backgroundColor:
								highlightIds?.get(user.address.city) === user.id ? '#f9f871' : 'transparent'
						}}
					>
						<td>{user.firstName} {user.lastName}</td>
						<td>{user.address.city}</td>
						<td>{new Date(user.birthDate).toLocaleDateString('de-DE')}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
interface Props {
	users: User[];
	highlightIds?: Map<string, number>;
}
export default UserTable;
