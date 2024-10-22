import { Pokemon } from '../../interface/pokemon';

export interface PokemonGridProps {
  pokemons: Pokemon[];
  onClick: (pokemon: Pokemon) => void;
}
