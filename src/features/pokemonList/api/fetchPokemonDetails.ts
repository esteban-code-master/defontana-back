import { EnvConfig } from '@/config/env-config';
import { Pokemon } from '../interface/pokemon';

export const FetchPokemonDetails = async (
  pokemonName: string
): Promise<Pokemon> => {
  if (pokemonName.includes('http')) {
    const res = await fetch(pokemonName);
    return await res.json();
  }
  const res = await fetch(`${EnvConfig.apiPokemon}/pokemon/${pokemonName}`);
  return await res.json();
};
