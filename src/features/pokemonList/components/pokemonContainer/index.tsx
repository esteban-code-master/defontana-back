'use client';

import { FC } from 'react';
import { Pagination } from '@/shared/components/pagination';
import { Autocomplete } from '@/shared/components/autocomplete';
import { Typography } from '@material-tailwind/react';
import { PokemonContainerProps } from './props';
import { PokemonGrid } from '../pokemonGrid';
import Image from 'next/image';
import { usePokemonPagination } from '../../hooks/usePokemonPagination';
import { Pokemon } from '../../interface/pokemon';
import { ReviewPokemon } from '@/features/pokemonDetail/components/reviewPokemon';

export const PokemonContainer: FC<PokemonContainerProps> = (props) => {
  const { pokemonsDefault = [], totalCount } = props;
  const {
    pokemonState,
    totalPage,
    nextPage,
    filterPokemonUrl,
    fetchPokemonsByName,
    fetchPokemonsByNames,
    fetchInitPokemon,
    setPokemonState
  } = usePokemonPagination(pokemonsDefault, totalCount);

  const onSearch = (searchQuery: string) => {
    if (searchQuery !== '') {
      const pokemonFound = filterPokemonUrl(searchQuery);
      fetchPokemonsByNames(pokemonFound);
      nextPage(0);
      return;
    }

    fetchInitPokemon();
  };

  const onSelect = (pokemon: Pokemon) => {
    console.log(pokemon);
    setPokemonState((prevState) => ({
      ...prevState,
      pokemonSelect: pokemon
    }));
  };

  return (
    <div className="grid grid-cols-12 lg:gap-10 justify-between">
      <div className="col-span-12 lg:col-span-4 mt-4 lg:order-2">
        {pokemonState.pokemonSelect.base_experience && (
          <ReviewPokemon pokemon={pokemonState.pokemonSelect} />
        )}
      </div>

      <div className="col-span-12 lg:col-span-8 lg:order-1">
        <div className="my-5">
          <Autocomplete
            filterItems={filterPokemonUrl}
            label="Comienza tu búsqueda aquí..."
            placeholder="Type to search..."
            onSearch={onSearch}
            onSelect={(item) => fetchPokemonsByName(item.name)}
            renderItem={(user) => (
              <div className="flex justify-between w-full">
                <Typography>{user.name}</Typography>
                <Image
                  src={'/icons/pokemon.png'}
                  width={25}
                  height={5}
                  alt=""
                  className="w-[25px] h-auto"
                />
              </div>
            )}
          />
        </div>

        <PokemonGrid pokemons={pokemonState.pokemonFilter} onClick={onSelect} />

        <Pagination totalPages={totalPage} onPageChange={nextPage} />
      </div>
    </div>
  );
};
