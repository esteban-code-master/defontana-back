import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Input, List, ListItem } from '@material-tailwind/react';
import { useAutocomplete } from '@/shared/hooks/useAutocomplete';
import { AutocompleteProps } from './props';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export const Autocomplete = <T extends object>(props: AutocompleteProps<T>) => {
  const { label, placeholder, renderItem, onSelect, onSearch, filterItems } =
    props;
  const { query, filteredItems, setQuery } = useAutocomplete({
    filterItems
  });
  const [show, setShow] = useState<boolean>(true);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const isShowAutocomplete = filteredItems.length > 0 && show;

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShow(true);
  };

  const handlerKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(query);
    }
  };

  useClickOutside(autocompleteRef, () => setShow(false));

  return (
    <div className="w-full max-w-md relative" ref={autocompleteRef}>
      <Input
        crossOrigin={''}
        label={label}
        value={query}
        placeholder={placeholder}
        className="border-primary"
        variant="outlined"
        icon={<MagnifyingGlassIcon />}
        onChange={handlerChange}
        onKeyDown={handlerKeyDownEnter}
      />

      {isShowAutocomplete && (
        <List className="bg-white mt-5 shadow-sm custom-scrollbar border-2 border-primary rounded-lg max-h-[200px] overflow-y-auto absolute z-20 w-full">
          {filteredItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                onSelect(item);
                setShow(false);
              }}
              className="cursor-pointer"
            >
              {renderItem(item)}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
