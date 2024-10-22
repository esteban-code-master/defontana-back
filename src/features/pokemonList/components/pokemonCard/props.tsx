import { Pokemon } from '../../interface/pokemon';

export interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  onClick?: () => void;
}
