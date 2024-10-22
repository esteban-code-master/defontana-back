import { ReactNode } from 'react';

export interface AutocompleteProps<T> {
  label: string;
  placeholder: string;
  filterItems: (query: string) => Promise<T[]> | T[];
  renderItem: (item: T) => ReactNode;
  onSelect: (item: T) => void;
  onSearch?: (searchQuery: string) => void;
}
