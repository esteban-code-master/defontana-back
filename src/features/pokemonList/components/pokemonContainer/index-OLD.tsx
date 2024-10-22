'use client';

import { FC, useEffect, useState } from 'react';
import { Pagination } from '@/shared/components/pagination';
import { EnvConfig } from '@/config/env-config';
import { Pokemon } from '../../interface/pokemon';
import { Autocomplete } from '@/shared/components/autocomplete';
import { Typography } from '@material-tailwind/react';
import { PokemonContainerProps } from './props';
import { PokemonGrid } from '../pokemonGrid';
import { usePokemonPagination } from '../../hooks old/usePokemonPagination';
import { usePokemonSearch } from '../../hooks old/usePokemonSearch';
import { usePokemonUrls } from '../../hooks old/usePokemonUrls';
import Image from 'next/image';
import { PokemonState } from '../../interface/pokemonState';

export const PokemonContainer: FC<PokemonContainerProps> = (props) => {
  const { pokemonsDefault = [], totalCount } = props;
  const [pokemonState, setPokemonState] = useState<PokemonState>({
    pokemonsUrls: [],
    pokemonCache: pokemonsDefault,
    pokemonFilter: pokemonsDefault,
    pokemonSelect: {} as Pokemon
  });

  const { setOffset } = usePokemonPagination(setPokemonState);
  const {
    pokemonFilter,
    fetchPokemonSearch,
    fetchPokemonsByName,
    filterPokemonUrl
  } = usePokemonSearch(pokemonState, setPokemonState);

  const { fetchGetAllPokemon } = usePokemonUrls(setPokemonState);

  useEffect(() => {
    fetchGetAllPokemon();
  }, []);

  //

  useEffect(() => {
    if (pokemonFilter.length > EnvConfig.defaultLimit) {
      const totalPages = Math.ceil(
        pokemonFilter.length / EnvConfig.defaultLimit
      );

      setTotalPage(totalPages);

      const startIndex = 0;
      const endIndex = startIndex + EnvConfig.defaultLimit;

      const d = pokemonState.pokemonCache.slice(startIndex, endIndex);

      console.log(d);

      setPokemonState((prevState) => ({
        ...prevState,
        pokemonCache: prevState.pokemonFilter,
        pokemonFilter: d
      }));

      console.log(pokemonState.pokemonFilter);
    }
  }, [pokemonFilter]);

  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(totalCount / EnvConfig.defaultLimit)
  );

  const [page, setPage] = useState<number>(1);

  const nextPage = (page: number) => {
    setPage(page);
    // setOffset((page - 1) * EnvConfig.defaultLimit);
  };

  const handlerNextPage = (page: number) => {
    // if("page" === "search_by_fetch")){
    //   return
    // }
  };

  return (
    <div>
      <div className="my-5">
        <Autocomplete
          filterItems={filterPokemonUrl}
          label="Comienza tu búsqueda aquí..."
          placeholder="Type to search..."
          onSearch={(KEY) => {
            fetchPokemonSearch(KEY);
          }}
          onSelect={(item) => fetchPokemonsByName(item.name)}
          renderItem={(user) => (
            <div className="flex justify-between w-full">
              <Typography>{user.name}</Typography>
              <Image src={'/icons/pokemon.png'} width={25} height={5} alt="" />
            </div>
          )}
        />
      </div>

      <PokemonGrid pokemons={pokemonFilter} onClick={() => {}} />

      <Pagination totalPages={totalPage} onPageChange={nextPage} />
    </div>
  );
};
