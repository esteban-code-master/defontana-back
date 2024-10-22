import { Pokemon } from '@/features/pokemonList/interface/pokemon';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { FC } from 'react';

export const ReviewPokemon: FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <div className="flex w-full items-end sticky top-[150px]">
      <div className="bg-red-500 h-full w-96 rounded-md p-2 border-4 border-yellow-800">
        <div className="bg-white p-5 rounded-md clip-triangle-them-white ">
          <div className="bg-blue-gray-500 rounded-md min-h-[100px]">
            <Image
              width={100}
              height={100}
              alt=""
              src={pokemon.sprites.other?.showdown.front_default as string}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-around gap-5">
            <div className="rounded-full bg-blue-gray-600 h-[50px] w-[50px]"></div>
            <div className="rounded-full bg-yellow-200 h-[5px] w-[100px]"></div>
            <div className="rounded-full bg-blue-gray-600 h-[5px] w-[100px]"></div>
          </div>

          <div className="grid grid-cols-2 justify-end items-end">
            <Typography>#</Typography>
            <Typography className="bold text-lg">{pokemon.id}</Typography>

            <Typography>Nombre:</Typography>
            <Typography>{pokemon.name}</Typography>

            <Typography>Peso:</Typography>
            <Typography>{pokemon.weight}</Typography>

            <Typography>Altura:</Typography>
            <Typography>{pokemon.height}</Typography>

            <Typography>Base experiencia:</Typography>
            <Typography>{pokemon.base_experience}</Typography>
          </div>

          <div>
            <Typography>Tipo</Typography>

            <div className="flex gap-2">
              {pokemon.types.map((type, index) => (
                <Typography
                  key={index}
                  variant="small"
                  color="blue-gray"
                  className="mb-2 bg-blue-500 rounded-md px-2 text-white"
                >
                  {type.type.name}
                </Typography>
              ))}
            </div>
          </div>

          <div>
            <Typography>Habilidades</Typography>

            <div className="flex gap-2">
              {pokemon.abilities.map((ability, index) => (
                <Typography
                  key={index}
                  variant="small"
                  color="blue-gray"
                  className="mb-2 bg-black rounded-md px-2 text-white"
                >
                  {ability.ability.name}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
