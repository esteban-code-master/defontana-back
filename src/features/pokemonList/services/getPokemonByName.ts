import { Pokemon } from '../interface/pokemon';
import { FetchPokemonDetails } from '../api/fetchPokemonDetails';

export const GetPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const pokemon = await FetchPokemonDetails(name);
    return pokemon;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw new Error('An error occurred while fetching Pokémon data');
  }
};
