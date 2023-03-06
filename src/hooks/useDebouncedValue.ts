import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T): T | null {
	const [searchValue, setSearchValue] = useState<T | null>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSearchValue(value);
		}, 2000);
		return () => {
			clearTimeout(timeout);
		};
	}, [value]);

	return searchValue;
}
