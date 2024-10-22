import { useEffect, useMemo, useState } from 'react';
import { EnvConfig } from '@/config/env-config';
import { Pokemon } from '../interface/pokemon';
import { PokemonState } from '../interface/pokemonState';
import { useSearchPokemons } from './useSearchPokemons';

export const usePokemonPagination = (
  pokemonsDefault: Pokemon[],
  totalCount: number
) => {
  const [pokemonState, setPokemonState] = useState<PokemonState>({
    pokemonsUrls: [],
    isFromPagination: true,
    pokemonCache: pokemonsDefault,
    pokemonFilter: pokemonsDefault,
    pokemonSelect: {} as Pokemon
  });
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(totalCount / EnvConfig.defaultLimit)
  );

  const {
    fetchPokemonsByName,
    fetchPokemonsByNames,
    fetchPokemonsPaginated,
    fetchGetAllPokemon
  } = useSearchPokemons(setPokemonState);

  const filterPokemonUrl = useMemo(
    () => (query: string) => {
      const { pokemonsUrls } = pokemonState;
      if (!query) return pokemonsUrls;

      return pokemonsUrls.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    },

    [pokemonState]
  );

  const nextPage = (page: number) => {
    const { isFromPagination, pokemonCache } = pokemonState;
    const startIndex = (page - 1) * EnvConfig.defaultLimit;

    if (!isFromPagination) {
      const endIndex = EnvConfig.defaultLimit * page;
      const pokemonFilter = pokemonCache.slice(startIndex, endIndex);

      setPokemonState((prevState) => ({
        ...prevState,
        pokemonFilter: pokemonFilter
      }));
      return;
    }

    fetchPokemonsPaginated(startIndex);
  };

  const fetchInitPokemon = () => {
    fetchPokemonsPaginated(0);
  };

  useEffect(() => {
    const total = pokemonState.isFromPagination
      ? Math.ceil(totalCount / EnvConfig.defaultLimit)
      : Math.ceil(pokemonState.pokemonCache.length / EnvConfig.defaultLimit);

    setTotalPage(total);
  }, [pokemonState, totalCount]);

  useEffect(() => {
    fetchGetAllPokemon();
  }, [fetchGetAllPokemon]);

  return {
    pokemonState,
    filterPokemonUrl,
    nextPage,
    totalPage,
    fetchPokemonsByName,
    fetchPokemonsByNames,
    fetchInitPokemon,
    setPokemonState
  };
};
