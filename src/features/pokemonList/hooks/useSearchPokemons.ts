import { Dispatch, SetStateAction } from 'react';
import { GetPokemonByName } from '../services/getPokemonByName';
import { PokemonState } from '../interface/pokemonState';
import { EnvConfig } from '@/config/env-config';
import { GetPaginatedPokemon } from '../services/getPaginationPokemon';
import { PokemonUrl } from '../interface/pokemonUrl';
import { GetAllPokemonUrl } from '@/features/pokemonSearch/services/getAllPokemonUrl';

export const useSearchPokemons = (
  setPokemonState: Dispatch<SetStateAction<PokemonState>>
) => {
  const fetchPokemonsByName = async (name: string): Promise<void> => {
    try {
      const pokemon = await GetPokemonByName(name);
      setPokemonState((prevState) => ({
        ...prevState,
        pokemonFilter: [pokemon]
      }));
    } catch (error) {
      console.error('Failed to fetch Pokemon by name:', error);
    }
  };

  const fetchPokemonsByNames = async (pokemon: PokemonUrl[]): Promise<void> => {
    try {
      const pokemons = await Promise.all(
        pokemon.map((pokemon) => GetPokemonByName(pokemon.url))
      );

      setPokemonState((prevState) => ({
        ...prevState,
        pokemonCache: pokemons,
        pokemonFilter: pokemons.slice(0, 12),
        isFromPagination: false
      }));
    } catch (error) {
      console.error('Failed to fetch Pokemons by URLs:', error);
    }
  };

  const fetchPokemonsPaginated = async (offset: number): Promise<void> => {
    try {
      const { pokemons } = await GetPaginatedPokemon({
        limit: EnvConfig.defaultLimit,
        offset
      });

      setPokemonState((prevState) => ({
        ...prevState,
        pokemonCache: pokemons,
        pokemonFilter: pokemons,
        isFromPagination: true
      }));
    } catch (error) {
      console.error('Failed to fetch paginated Pokemons:', error);
    }
  };

  const fetchGetAllPokemon = async () => {
    const { results } = await GetAllPokemonUrl();
    setPokemonState((prevState) => ({
      ...prevState,
      pokemonsUrls: results
    }));
  };

  return {
    fetchPokemonsByName,
    fetchPokemonsByNames,
    fetchPokemonsPaginated,
    fetchGetAllPokemon
  };
};
