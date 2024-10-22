import { FetchPokemonUrlList } from '@/features/pokemonList/api/fetchPokemonUrlList';

export const GetAllPokemonUrl = async () => {
  return await FetchPokemonUrlList({ limit: 1000, offset: 0 });
};
