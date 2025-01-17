import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMobile, useLargeDevice, useMediumDevice} from '../../context';

function SearchField({ value, onChange, onSubmit }) {
	return (
		<input 
			type="text"
			placeholder="Search..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
			className='w-full outline-none lg:p-1 bg-transparent'
			autoFocus
		/>
	);
}

function SearchBar() {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { isMobile } = useMobile();
	const { isMediumDevice } = useMediumDevice();
	const { isLargeDevice } = useLargeDevice();

	const handleSearch = () => {
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	// Initialize search query from URL params
	React.useEffect(() => {
		const q = searchParams.get('q');
		if (q) {
			setSearchQuery(q);
		}
	}, [searchParams]);

	return (
		<div className='relative'>
			<div className='flex items-center gap-2 border border-gray-300 rounded-lg p-2'>
				<FaSearch 
					className='text-gray-500 w-5 h-5 cursor-pointer'
					onClick={handleSearch}
				/>
				<SearchField 
					value={searchQuery}
					onChange={setSearchQuery}
					onSubmit={handleSearch}
				/>
			</div>
		</div>
	);
}

export default SearchBar;
