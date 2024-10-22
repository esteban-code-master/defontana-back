import { Pokemon } from './pokemon';
import { PokemonUrl } from './pokemonUrl';

export interface PokemonState {
  isFromPagination: boolean;
  pokemonsUrls: PokemonUrl[];
  pokemonFilter: Pokemon[];
  pokemonCache: Pokemon[];
  pokemonSelect: Pokemon;
}
