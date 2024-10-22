import { FunctionComponent } from 'react';
import { PokemonGridProps } from './props';
import { PokemonCard } from '../pokemonCard';

export const PokemonGrid: FunctionComponent<PokemonGridProps> = (props) => {
  const { pokemons, onClick } = props;

  return (
    <div className="grid grid-col-2 md:grid-cols-4 gap-5 py-5">
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={index}
          className="cursor-pointer transform transition duration-300 hover:scale-110"
          onClick={() => onClick(pokemon)}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};
