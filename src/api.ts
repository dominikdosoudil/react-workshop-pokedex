import ky from "ky";
import { ITEMS_PER_PAGE, URL_ROOT } from "./constatns.ts";
import { z } from "zod";

const pokemonListParser = z.object({
  count: z.number().int(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type Pokemons = z.infer<typeof pokemonListParser>["results"];

export const listPokemons = async (page: number) => {
  const response = ky.get(
    `${URL_ROOT}/pokemon?limit=10&offset=${page * ITEMS_PER_PAGE}`,
  );

  const jsonData = await response.json();

  return pokemonListParser.parse(jsonData);
};

const pokemonDetailParser = z.object({
  id: z.number().int(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
  }),
});

export const getPokemon = async (name: string) => {
  const response = await ky.get(`${URL_ROOT}/pokemon/${name}`).json();

  return pokemonDetailParser.parse(response);
};
