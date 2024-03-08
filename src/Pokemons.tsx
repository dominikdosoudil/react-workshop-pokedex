import React, { useState } from "react";
import style from "./pokemon-list.module.css";
import Pagination from "./Pagination.tsx";
import { ITEMS_PER_PAGE } from "./constatns.ts";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { listPokemons } from "./api.ts";

interface PokemonsProps {
  onSelect: (e: React.MouseEvent, pokemonName: string) => void;
}

const Pokemons = ({ onSelect }: PokemonsProps) => {
  const [page, setPage] = useState(0);
  const pokemons = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => listPokemons(page),
    retry: false,
    placeholderData: keepPreviousData,
  });

  if (pokemons.isPending) {
    return <div>Loading...</div>;
  }

  if (pokemons.isError) {
    console.warn(pokemons.error);
    return <div>Could not load pokemons</div>;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.pokemonList}>
        {pokemons.data.results.map((pokemon) => (
          <button key={pokemon.name} onClick={(e) => onSelect(e, pokemon.name)}>
            {pokemon.name}
          </button>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={pokemons.data.count / ITEMS_PER_PAGE}
        onChange={(_, p) => setPage(p)}
      />
    </div>
  );
};

export default Pokemons;
