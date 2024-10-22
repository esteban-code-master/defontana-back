import { useState, useEffect } from 'react';

interface UseAutocompleteProps<T> {
  filterItems: (query: string) => Promise<T[]> | T[];
}

export const useAutocomplete = <T>({
  filterItems
}: UseAutocompleteProps<T>) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredItems([]);
      return;
    }

    const fetchData = async () => {
      const items = await filterItems(query);
      setFilteredItems(items);
    };

    fetchData();
  }, [query]);

  return {
    query,
    filteredItems,
    setQuery
  };
};
