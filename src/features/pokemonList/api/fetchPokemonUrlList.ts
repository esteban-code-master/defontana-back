import { EnvConfig } from '@/config/env-config';
import { Pagination } from '@/shared/interface/pagination';
import { ExtendedQueryParams } from '@/shared/interface/filter';
import { PokemonUrl } from '../interface/pokemonUrl';

export const FetchPokemonUrlList = async (
  queryParams: ExtendedQueryParams
): Promise<Pagination<PokemonUrl[]>> => {
  const { limit, offset } = queryParams;
  const url = `${EnvConfig.apiPokemon}/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  return await res.json();
};
