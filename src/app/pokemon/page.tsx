import { EnvConfig } from '@/config/env-config';
import { PokemonContainer } from '@/features/pokemonList/components/pokemonContainer';
import { GetPaginatedPokemon } from '@/features/pokemonList/services/getPaginationPokemon';
import { PageTitle } from '@/shared/components/pageTitle';
import { NextPage } from 'next';

const Page: NextPage = async () => {
  const { totalCount, pokemons } = await GetPaginatedPokemon({
    limit: EnvConfig.defaultLimit,
    offset: 0
  });

  return (
    <div className="container m-auto py-10 px-5">
      <div>
        <PageTitle
          title="Bienvenido a tu tienda Pokemon"
          subtitle="Busca y atrapa a tu Pokemon favorito"
        />
      </div>

      <PokemonContainer pokemonsDefault={pokemons} totalCount={totalCount} />
    </div>
  );
};

export default Page;
