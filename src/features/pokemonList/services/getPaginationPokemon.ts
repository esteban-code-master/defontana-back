import { ListQueryParams } from '@/shared/interface/filter';
import { Pokemon } from '../interface/pokemon';
import { FetchPokemonDetails } from '../api/fetchPokemonDetails';
import { FetchPokemonUrlList } from '../api/fetchPokemonUrlList';
import { PokemonUrl } from '../interface/pokemonUrl';

export const GetPaginatedPokemon = async (
  queryParams: ListQueryParams
): Promise<{ totalCount: number; pokemons: Pokemon[] }> => {
  try {
    const pokemonsUrl = await FetchPokemonUrlList(queryParams);

    if (
      !pokemonsUrl ||
      !pokemonsUrl.results ||
      pokemonsUrl.results.length === 0
    ) {
      throw new Error('No Pokémon found for the given query parameters.');
    }

    const pokemons = await Promise.all(
      pokemonsUrl.results.map((pokemonUrl: PokemonUrl) =>
        FetchPokemonDetails(pokemonUrl.name)
      )
    );

    return { totalCount: pokemonsUrl.count, pokemons };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw new Error('An error occurred while fetching Pokémon data');
  }
};
