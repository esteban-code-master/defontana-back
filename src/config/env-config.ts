export const EnvConfig = {
  apiPokemon: process.env.NEXT_PUBLIC_API_POKEMON as string,
  defaultLimit: Number(process.env.NEXT_PUBLIC_DEFAULT_LIMIT) as number,
};
