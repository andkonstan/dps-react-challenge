// src/components/SearchBar.tsx
import React from 'react';

interface Props {
  rawSearchTerm: string;
  setRawSearchTerm: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  highlightOldest: boolean;
  setHighlightOldest: (value: boolean) => void;
  cities: string[];
}

const SearchBar: React.FC<Props> = ({
	rawSearchTerm,
	setRawSearchTerm,
	selectedCity,
	setSelectedCity,
	highlightOldest,
	setHighlightOldest,
	cities
}) => {
	return (
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
				{cities.map(city => (
					<option key={city} value={city}>{city}</option>
				))}
			</select>

			<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Highlight oldest per city
				<input
					type="checkbox"
					checked={highlightOldest}
					onChange={(e) => setHighlightOldest(e.target.checked)}
				/>
			</label>
		</div>
	);
};

export default SearchBar;