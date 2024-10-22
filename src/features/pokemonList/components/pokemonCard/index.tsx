'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';

import { FunctionComponent } from 'react';
import { PokemonCardProps } from './props';

export const PokemonCard: FunctionComponent<PokemonCardProps> = (props) => {
  const { pokemon, className, onClick } = props;

  return (
    <Card className={`mt-6 ${className}`} variant="gradient" onClick={onClick}>
      <CardHeader
        color="red"
        floated={false}
        shadow={false}
        className="m-0 rounded-b-none overflow-visible"
        hidden={false}
      >
        <div className="flex justify-between items-center px-4">
          <Image
            width={80}
            height={100}
            src={pokemon?.sprites?.front_default}
            className="w-[100px] h-auto"
            alt="card-image"
          />
          <Typography variant="h6" color="white" className="mb-2 capitalize">
            {`#${pokemon.id}`}
          </Typography>
        </div>
        <div className="bg-black h-[10px] w-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full border-4 border-black border-solid h-[50px] w-[50px] flex justify-center items-center">
            <div className="rounded-full border-4 border-gray-400 border-solid h-[30px] w-[30px]"></div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 capitalize">
          {pokemon.name}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-4">
        {pokemon.types.map((type, index) => (
          <Typography
            key={index}
            variant="small"
            color="blue-gray"
            className="mb-2 bg-blue-gray-700 rounded-md px-2 text-white"
          >
            {type.type.name}
          </Typography>
        ))}
      </CardFooter>
    </Card>
  );
};
